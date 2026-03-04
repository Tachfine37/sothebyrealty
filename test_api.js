const http = require('http');
const https = require('https');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/settings/whatsapp',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  }
};
const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});
req.on('error', e => console.error(e));
req.write(JSON.stringify({ whatsappEnabled: true, whatsappNumber: '123' }));
req.end();
