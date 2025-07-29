// netlify/functions/proxy.js

const axios = require('axios');
exports.handler = async function (event) {
  const data = JSON.parse(event.body); // frontend will send JSON data
  try {
    // Make a POST request to your backend API (even if it's HTTP)
    const response = await axios.post(
      'http://msme.drunkcafe.in/api/applications',
      data
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

 