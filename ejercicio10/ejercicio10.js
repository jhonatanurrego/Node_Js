const http = require('node:http');
const fs = require('node:fs');
const { error } = require('node:console');

const mime = {
    'html' : 'text/html',
    'css' : 'text/css',
    'js' : 'text/javascript',
    'png' : 'image/png',
    'jpg' : 'image/jpg',
    'ico' : 'image/s-icon',
    'mp3' : 'audio/mpeg3',
    'mp4' : 'video/mp4',
    'pdf' : 'application/pdf'
}

const servidor = http.createServer((pedido,respuesta) => {
    const url = new URL('http://localhost:7666' + pedido.url);
    let camino = 'static' + url.pathname;
    if (camino == 'static/') {
        camino = 'static/index.html';
    }
    fs.stat(camino, error => {
        if(!error) {
            fs.readFile(camino, (error, contenido) => {
                if (error) {
                    respuesta.writeHead(500, {'content-type' : 'text/plain'});
                    respuesta.write('Error interno');
                    respuesta.end();
                }
                else {
                    const vec = camino.split('.')        
                    const extension = vec[vec.length - 1];
                    const mimearchivo = mime[extension];
                    respuesta.writeHead(200, {'content-type' : mimearchivo });
                    respuesta.write(contenido);
                    respuesta.end();
                }
            })
        } else {
            respuesta.writeHead(404, {'content-type' : 'text/html'});
            respuesta.write('<!doctype html><html><head></head><body>recurso inexistente</body></html>')
            respuesta.end();
        }
    })
})

servidor.listen(7666);
console.log('Servidor iniciado');