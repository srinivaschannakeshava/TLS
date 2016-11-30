const tls = require('tls');
const fs = require('fs');
const option = {
    key: fs.readFileSync('srini-key.pem'),
    cert: fs.readFileSync('srini-cert.pem'),
    rejectUnauthorized: false,
    ca: [fs.readFileSync('server-cert.pem')]
};

const socket = tls.connect(8000, option, function() {
    console.log('client connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(socket);

});

socket.on('data', (data) => {
  console.log('Data Event!!');
    console.log(data);
});
socket.on('end', () => {
  console.log('End event detected!!');
    socket.end();
});
