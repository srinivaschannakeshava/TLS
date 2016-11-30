const tls = require('tls');
const fs = require('fs');
const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    requestCert: true,
    ca: [fs.readFileSync('srini-cert.pem')]
};

const server = tls.createServer(options, (socket) => {
    console.log('server connected',
    socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(socket);
    socket.end();
});
server.on('data',(data)=>{
  console.log(data);
})

server.listen(8000, () => {
    console.log('server bound');
});
