const os = require('os');

console.log('Sistema operativo: ' + os.platform());
console.log('Version del sistema operativo: ' + os.release());
console.log('Memoria total: ' + (os.totalmem() / 1024) + ' bytes');
console.log('Memoria libre: ' + os.freemem());
console.log('Arquitectura CPU: ' + os.arch());
console.log('CPUs: ' + os.cpus().length);
console.log('Nombre del host: ' + os.hostname());
console.log('Directorio temporal: ' + os.hostname());










