const http = require('node:http');

const servidor = http.createServer((pedidp, respuesta) => {
    respuesta.writeHead(200, {'content-type': 'text/html'})
    respuesta.write('<!doctype html><head></head><body><h1>Hola mundo</h1></body></html>');
    respuesta.end()
})

servidor.listen(7666)
console.log('Servidor web iniciado')




