const http = require('node:http');
const fs = require('node:fs/promises');

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
};

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url);
  let camino = 'public' + url.pathname;
  if (camino === 'public/') camino = 'public/index.html';

  encaminar(pedido, respuesta, camino)
    .catch((error) => {
      respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
      respuesta.write('Error interno');
      respuesta.end();
    });
});
servidor.listen(8888);

function encaminar(pedido, respuesta, camino) {
  return new Promise((resolve, reject) => {
    switch (camino) {
      case 'public/cargar': {
        grabarComentarios(pedido, respuesta)
          .then(resolve)
          .catch(reject);
        break;
      }
      case 'public/leercomentarios': {
        leerComentarios(respuesta)
          .then(resolve)
          .catch(reject);
        break;
      }
      default: {
        fs.stat(camino)
          .then(() => {
            return fs.readFile(camino);
          })
          .then((contenido) => {
            const extension = camino.split('.').pop();
            const mimearchivo = mime[extension];
            respuesta.writeHead(200, { 'Content-Type': mimearchivo });
            respuesta.write(contenido);
            respuesta.end();
            resolve();
          })
          .catch(() => {
            respuesta.writeHead(404, { 'Content-Type': 'text/html' });
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            respuesta.end();
            resolve();
          });
        break;
      }
    }
  });
}

function grabarComentarios(pedido, respuesta) {
  return new Promise((resolve, reject) => {
    let info = '';
    pedido.on('data', (datosparciales) => {
      info += datosparciales;
    });

    pedido.on('end', () => {
      const formulario = new URLSearchParams(info);
      respuesta.writeHead(200, { 'Content-Type': 'text/html' });
      const pagina = `<!doctype html><html><head></head><body>
                    Nombre:${formulario.get('nombre')}<br>
                    Comentarios:${formulario.get('comentarios')}<br>
                    <a href="index.html">Retornar</a>
                    </body></html>`;
      respuesta.end(pagina);
      grabarEnArchivo(formulario)
        .then(resolve)
        .catch(reject);
    });

    pedido.on('error', reject);
  });
}

function grabarEnArchivo(formulario) {
  return fs.appendFile('public/visitas.txt', `nombre:${formulario.get('nombre')}<br>comentarios:${formulario.get('comentarios')}<hr>`)
    .catch((error) => {
      console.log(error);
    });
}

function leerComentarios(respuesta) {
  return fs.readFile('public/visitas.txt')
    .then((datos) => {
      respuesta.writeHead(200, { 'Content-Type': 'text/html' });
      respuesta.write('<!doctype html><html><head></head><body>');
      respuesta.write(datos);
      respuesta.write('</body></html>');
      respuesta.end();
    })
    .catch((error) => {
      respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
      respuesta.write('Error al leer los comentarios');
      respuesta.end();
    });
}

console.log('Servidor web iniciado');
