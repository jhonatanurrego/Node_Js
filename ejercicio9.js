const http = require('node:http');
const fs = require('node:fs');
const { error } = require('node:console');
const { text } = require('node:stream/consumers');

const servidor = http.createServer((pedido,respuesta) => {
    const url = new URL('http://localhost:3000' + pedido.url);
    let camino = 'static' + url.pathname;
    if (camino == 'static/')
        camino = 'static/index.html'
    fs.stat(camino, error => {
        if (!error) {
            fs.readFile(camino, (error,contenido) => {
                if(error) {
                    respuesta.writeHead(500,{'content-type' : 'text/plain'})
                    respuesta.write('Error interno')
                    respuesta.end()
                }else {
                    respuesta.writeHead(200,{'content-type' : 'text/html'})
                    respuesta.write(contenido)
                    respuesta.end()
                }
            })
        }else {
            respuesta.writeHead(404, {'content-type' : 'text/html'})
            respuesta.write('<!doctype html><html><head></head><body>recurso inexistente</body></html>')
        }
    })
});

servidor.listen(3000);
console.log('Servidor iniciado')















