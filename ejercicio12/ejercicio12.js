const http = require('node:http');
const fs = require('node:fs');

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4',
    'pdf': 'application/pdf'
}

const servidor = http.createServer((pedido, respuesta) =>{
    const url = new URL ('http://localhost:8888' + pedido.url)
    let camino = 'public' + url.pathname
    if (camino == 'public/')
        camino = 'public/index.html'
    encaminar (pedido, respuesta, camino)
})

servidor.listen(8888)

function encaminar(pedido, respuesta, camino){
    console.log(camino)
    switch (camino) {
        case 'public/recuperardatos' :{
            recuperar(pedido, respuesta)
            break
        }
        default:{
            fs.stat(camino, error  => {
                if(!error){
                    fs.readFile(camino, (error, contenido) => {
                        if (error) {
                            respuesta.writeHead(500, {'content-type': 'text/plain'})
                            respuesta.write('Error interno')
                            respuesta.end()
                        }else{
                            const vec = camino.split('.')
                            const extension = vec[vec.length - 1]
                            const mimearchivo = mime[extension]
                            respuesta.writeHead(200, {'content-type': mimearchivo})
                            respuesta.write(contenido)
                            respuesta.end()
                        }
                    })
                }else{
                    respuesta.writeHead(404, {'content-type': 'text/html'});
                    respuesta.write('<!doctype html><html><head></head><body><h1>Error: 404: Recurso inexistente</h1></body></html>');
                    respuesta.end();
                }
            })
        }
            
    }
}

function recuperar(pedido, respuesta){
    let info = ''
    pedido.on('data', datosparciales => {
        info += datosparciales
    }) 
    pedido.on('end', () => {
        const formulario = new URLSearchParams(info)
        console.log(formulario) 
        respuesta.writeHead(200, {'content-type' : 'text/html'})
        const pagina = 
        `<!doctype html><html><head><tittle>Datos del formulario</tittle></head><body>
        <h2>Nombre de usuario: ${formulario.get('nombre')}</h2>
        <h2>Clave: ${formulario.get('clave')}</h2><br>
        <a href="index.html">Volver</a>
        </body></html>`
        respuesta.end(pagina)
    })
}

console.log("Servidor web iniciado")
