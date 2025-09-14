const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email: 'admin@acme.test',
      password: 'password'
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
}

testLogin();