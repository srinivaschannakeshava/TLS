TLS(SSL)

->TLS- transport layer security and SSL- secure socket layer

-> TLS/SSL is a public/private key infrastructure(PKI)

->Most common cases each client and server must have a private key.

------------Generation of private key using openSSL------------------------

		openssl genrsa -out srini-key.pem 2048

----------------------- ---- ----------------------------------------------

->TLS/SSL all the servers (and some clients) must have certificate .

	->Certificates are public keys that corresponds to a privatekey,
		that are digitally signed by CA or owner of private key(self signed).

	-> steps for obtaining a certificate is to create a Certificate Signing Request(CSR) file.

------------Generation of CSR using openSSL--------------------------------

     	openssl req -new -sha256 -key srini-key.pem -out srini-csr.pem

----------------------------- ---------------------------------------------

-> Once CSR is generated it is sent to CA for signing or used to generate a self signed certificate.

----------------Generating a self signed Certificate using OpenSSL---------------------------------

		openssl x509 -req -in srini-csr.pem -signkey srini-key.pem -out srini-cert.pem

------------------------------------- -------------------------------------------------------------

----------------Generating .pfx or .p12 file using openSSL--------------------------------

-> using certificate and the private key you can generate .p12 or .pfx file

		openssl pkcs12 -export -in srini-cert.pem -inkey srini-key.pem \   -certfile ca-cert.pem -out srini.pfx

------------------------------------------ -----------------------------------------------

-> Perfect forward secrecy / Forward secrecy -

	->feature of key-agreement (i.e., key-exchange) method.

	->Server and Client keys negotiate new temporary keys that are specifically used for that session.

	->So even if the private key is compromised evesdroping is not possible unless the key-pair generated for that session is available.

	->Perfect Forward Secrecy is achieved by randomly generating a key pair for key-agreement on every TLS/SSL handshake . -> Implementation is termed as ephemeral

				->DHE - Diffie-Hellman Ephemeral

				->ECDHE- Elliptic Curve Diffie-Hellman Ephemeral

->ALPN,NPN and SNI

		-> Application Layer Protocol Negotiation , Next Protocol Negotiation and Server Name Indication are TLS handshake extension.

		-> ALPN and NPN -> HTTP,SPDY,HTTP/2

		->SNI - Allows to use one TLS server for multiple hostname with diff ssl certificate.

->Client-initated renegotiation attack mitigation

	-> TLS protocol allows clients to renegotiate certain aspects of the TLS session.

	->Session renegotiation requires a disproportionate amount of server-side resources, making it a potential vector for denial-of-service attacks

----------------------------------------------------- --------------------------------------------------------------------------------------------------------------------

-> TLS using NodeJS 		

	tls.CLIENT_RENEG_LIMIT <number> Specifies the number of renegotiation requests. Defaults to 3.

	tls.CLIENT_RENEG_WINDOW <number> Specifies the time renegotiation window in seconds. Defaults to 600 (10 minutes).


-> Note:   requestCert: true -> on server makes it client authentication

		   rejectUnauthorized: true -> on the client makes it server authentication.

		   key and certificate are mandatory for the client and server.

			 how ever the server certificate on the client is mandatory on the case of self signed certificates
