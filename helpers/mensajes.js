const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();

        console.log("=========================".green);
        console.log("  Seleccione una opcion  ".green);
        console.log("=========================\n".green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione una opcion: ', (opt) => {
    
            // console.log({opt});
            readLine.close();

            resolve(opt);
    
        });
    })
}

const pausa = () => {

    return new Promise( resolve => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(`\n Precione ${'Enter'.green} Para continuar \n`, (opt) => {

            readLine.close();
            resolve();

        });
    });

}

module.exports = {

    mostrarMenu,
    pausa

}