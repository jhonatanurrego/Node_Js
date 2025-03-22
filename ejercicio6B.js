
const { error } = require('node:console');
const fs = require('node:fs/promises');

fs.readFile('./archivo.txt')
    .then(datos => {
        console.log(datos.toString())
    })
    .catch(error => {
        console.log('Hubo un error')
    })


