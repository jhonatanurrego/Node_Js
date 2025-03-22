const { log } = require('node:console');
const http = require('node:http');
const { url } = require('node:inspector/promises');

const servidor = http.createServer((pedido,respuesta) => {
    const url = new URL('http://localhost:7666' + pedido.url);
    console.log('href:' + url.href);
    console.log('pathname:' + url.pathname);
    console.log('origin:' + url.origin);
    console.log('username:' + url.username);
    console.log('protocol:' + url.protocol);
    console.log('host:' + url.host);
    console.log('hostname:' + url.hostname);
    console.log('port:' + url.port); 
    console.log('search:' + url.search);
    url.searchParams.forEach((valor,parametro) => {
        console.log('Nombre del parametro: ' + parametro + ', valor del parametro: ' + valor);
    })

    respuesta.writeHead(200, {'content-type': 'text/html'});
    respuesta.write('<!doctype html><head></head><body><h1>¡Hola mundo!</h1><p>¿Que mas?</p></body></html>');
    respuesta.end();


});

servidor.listen(7666);
console.log('Servidor web iniciado');


// :http://localhost:7666/
// http://localhost:7666/favicon.ico


























