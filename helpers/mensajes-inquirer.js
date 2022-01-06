const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Crear Tarea`
            },

            {
                value: '2',
                name: `${'2.'.yellow} Listar Tareas`
            },

            {
                value: '3',
                name: `${'3.'.yellow} Listar Tareas Completadas`
            },

            {
                value: '4',
                name: `${'4.'.yellow} Listar Pendientes`
            },

            {
                value: '5',
                name: `${'5.'.yellow} Completar Tarea(s)`
            },

            {
                value: '6',
                name: `${'6.'.yellow} Borrar Tareas`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Salir`
            }
        ]
    }
]



const inquirerMenu = async() => {

    console.clear();

    console.log("=========================".green);
    console.log("  Seleccione una opcion  ".green);
    console.log("=========================\n".green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;


}

const inquirerPausa = async() => {

    const pausaOpt = [
        {
            type: 'input',
            name: 'Pausa',
            message: `Precione ${'Enter'.green} para continuar`,
        }
    
    ]

    console.log('\n');

    await inquirer.prompt(pausaOpt);


}

const leerInput = async( message ) =>{

    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                else{

                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasABorrar = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({

        value:'0',
        name:'0.'.green + 'Cancelar'

    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'borrar',
            choices

        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id; 

}

const listadoChecklist = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices

        }
    ];

    const {ids} = await inquirer.prompt(preguntas);

    return ids; 

}


const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name:'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
}

module.exports = {

    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasABorrar,
    listadoChecklist,
    confirmar

}