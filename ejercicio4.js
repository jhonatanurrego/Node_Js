// crear un programa que requiera modulo os, que muestre lo disponible en RAM 
// luego cree un arreglo con 100000 de numeros enteros positivos 
// luego muestre el uso de la memoria

const os = require('os');


console.log('Memoria libre: ' + os.freemem());

const arreglo = [];

for (let i = 0; i < 1000000; i++) {
    arreglo.push(i + 1);
}

console.log('Memoria libre: ' + os.freemem());







