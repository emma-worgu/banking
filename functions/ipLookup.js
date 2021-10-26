const axios = require('axios');
require('dotenv').config();

const ipLookup = async (ip, callback) => {
  try {
    const url = `http://api.ipstack.com/${ip}?access_key=${process.env.ipToken}`;

    const options = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    callback(false, response.data.country_name);
  } catch (error) {
    callback(error, false)
  }
}

module.exports.ipLookup = ipLookup;