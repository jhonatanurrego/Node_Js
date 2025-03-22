const { error } = require('node:console');
const fs = require('node:fs/promises');

async function leerDirectorio() {
    const archivo = await fs.readdir('./');
    for (let archivo of archivos) {
        console.log(archivo)
    } 
}

leerDirectorio()
    .then(() => {
        console.log('bien')
    })
    .catch(error => {
        console.log(error)
    })