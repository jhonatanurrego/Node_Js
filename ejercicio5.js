const fs = require('node:fs');



for (let i = 0; i < 5; i++) {
    fs.writeFile('./archivo.txt', 'Linea uno \n Jhonatan Vasquez \n jhonatan013vasquez@gmail.com', error => {
        if (error) {
            console.error('Error al escribir el archivo');
        } else {
            console.log('Archivo escrito correctamente');
        }
    } )
    
}




 



