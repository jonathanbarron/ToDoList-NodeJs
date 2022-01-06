
require('colors');
const { inquirerMenu,inquirerPausa, leerInput,listadoTareasABorrar,listadoChecklist,confirmar } = require('./helpers/mensajes-inquirer');
const { saveDB,readDB } = require('./helpers/save-data');
const Tareas = require('./models/tasks');

const main = async() =>{

    let opt  = '';
    const tareas = new Tareas();
    const tareasDB = readDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.createTask( desc );
                break;
            case '2':
                console.log( tareas.listadoArr);
                break;
            case '3':
                tareas.listadoPendingCompleted(true);
                break;
            case '4':
                tareas.listadoPendingCompleted(false);
                break;
            case '5':
                const ids = await listadoChecklist( tareas.listadoArr);
                console.log(ids);
                break;
            case '6':
                // Listar las tareas para borrar
                const id = await listadoTareasABorrar(tareas.listadoArr);
                // confirmar si realmente se desea borrar
                if( id !== '0'){
                    const ok = await confirmar('¿Esta seguro de eliminar la tarea?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log(`Tarea Borrada correctamente`.green)
                    }
                }
                break;
        }

        saveDB( tareas.listadoArr);
        
        await inquirerPausa();

    } while (opt !== '0');
}

main();