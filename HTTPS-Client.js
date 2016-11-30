const https = require('https');
const fs = require('fs');

var options = {
    hostName: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET',
    key: fs.readFileSync('srini-key.pem'),
    cert: fs.readFileSync('srini-cert.pem'),
    rejectUnauthorized: false,
    ca: [fs.readFileSync('server-cert.pem')]
}
var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        console.log(d.toString());
    });
});
req.end();

req.on('error', (e) => {
    console.error(e);
});
