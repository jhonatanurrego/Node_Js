const fs = require('node:fs/promises')


fs.writeFile('./archivo1B.txt.pdf', 'Linea uno \n Linea dos \n Linea tres')
    .then(() => {
        console.log('El archivo se ha creado correctamente')
})
    .catch(error => {
        console.log(error)
})





