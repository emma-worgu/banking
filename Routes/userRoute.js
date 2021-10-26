const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Model/userModel');
const { UserAuthMiddleware } = require('../Middlewares/authMiddleware');
const { ipLookup } = require('../functions/ipLookup');
const { registerValidation, loginValidation } = require('../Joi_Validation/register_login_validation');

route.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const emailExist = await UserModel.findOne({ email: req.body.email });
    const phoneExist = await UserModel.findOne({ phone: req.body.phone });
    if (emailExist) {
      return res.status(400).json({
        message: 'Email is already in Use',
      });
    }
    if (phoneExist) {
      return res.status(400).json({
        message: 'Phone Number is already in Use',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let accountNumber;
    let isClient;

    const generateAccountNumber = async () => {
      const acctNumber = Math.floor(Math.random() * 10000000000);
      const acctNumberExist = await UserModel.findOne({ accountNumber: acctNumber });

      if (acctNumberExist) {
        generateAccountNumber();
      }

      accountNumber = acctNumber;

    };

    await generateAccountNumber();

    await ipLookup(req.body.ip, (err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Something Went Wrong',
        });
      }

      if (data.toLowerCase() === 'nigeria') {
        isClient = false;
      } else {
        isClient = true;
      }
    });

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phone,
      isClient,
      ipAddress: req.body.ip,
      accountNumber,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.UserToken, { expiresIn: 60 * 60 });
    res.header('auth-token', token);
    user.save();

    return (res.json({
      token,
      user,
    }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errMessage: 'Something Went Wrong!!',
    });
  }
});

route.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    let user;
    if (req.body.email) {
      user = await UserModel.findOne({
        email: req.body.email,
      });
    } else if (req.body.phone) {
      user = await UserModel.findOne({
        phone: req.body.phone,
      });
    } else {
      return res.status(400).json({ errMessage: 'Please use email or phone number to login' });
    }

    if (!user) {
      return res.status(400).send('Incorrect Credentials!!');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Incorrect Credentials!!');
    }
    const token = jwt.sign({ _id: user._id }, process.env.UserToken, { expiresIn: 60 * 60 });
    res.header('auth-token', token);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        acct: user.accountNumber,
      },
    });
  } catch (err) {
    return res.status(400).json({
      errMessage: 'Something Went Wrong!!',
    });
  }
});

route.get('/', UserAuthMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        address: user.address,
        acctNumber: user.accountNumber,
        isClient: user.isClient,
        accountBalance: user.accountBalance,
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Serval Error',
    });
  }
});

route.get('/receipient', UserAuthMiddleware, async (req, res) => {
  try {
    const receipient = await UserModel.findOne({ accountNumber: req.body.acctNumber });

    if(!receipient) {
      return res.status(404).json({
        message: 'No User Found with that Wallet Address',
      });
    }

    return res.status(200).json({
      user: receipient.name,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Try Again!!',
    });
  }
});

module.exports = route;