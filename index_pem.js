var rsab = require('./main_pem');

var key = rsab.generateKeyPair(1024);
console.log('private=', key.private);
console.log('public=', key.public);

var buffer = new Uint8Array(10);

var enc2 = rsab.publicEncrypt(key.public, buffer);
console.log('enc2=', enc2);
var dec2 = rsab.privateDecrypt(key.private, enc2);
console.log('OK? dec2=', dec2);

var sig = rsab.sign(key.private, 'Hello World');
console.log('sig=', sig);

var result = rsab.verify(key.public, 'Hello World', sig);
console.log('result=', result);

var der = rsab.pem2der('pkcs1-private', key.private);
console.log('key private : pem to der = ', der);
var pem = rsab.der2pem('pkcs1-private', der);
console.log('key private : der to pem = ',  pem);
var der = rsab.pem2der('pkcs1-public', key.public);
console.log('key public : pem to der = ', der);
var pem = rsab.der2pem('pkcs1-public', der);
console.log('key public : der to pem = ',pem);