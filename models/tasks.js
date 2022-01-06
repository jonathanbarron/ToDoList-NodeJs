const Tarea = require('./task');


class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        // desestructurar el objeto y convertirlo en un array
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id='') {

        if (this._listado[id]) {
                delete this._listado[id];
        } 

    }

    cargarTareasFromArray( tareas = []){

        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        }); 

    }

    // funcion para crear tareas
    createTask( desc="" ){

        // se manda la descripcion como sobre carga para poder guardarla
        const tarea = new Tarea(desc);

        // se le asigna el uuid hash ala tarea
        this._listado[tarea.id] = tarea;
        // this._listado[tarea.desc] = desc;


    }

    listadoCompletado(){

        this.listadoArr.forEach(tarea, i => {
            console.log();
            const idx = `${i + 1}.green`;
            const {desc, completadoEn} = tarea;
            const estado = ( completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
                    
        });  
    }

    listadoPendingCompleted( completadas = true){
        console.log();
        let contador = 0;

        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = ( completadoEn) ? 'Completada'.green : 'Pendiente'.red;
        
            if( completadas ){
                if (completadoEn) {
                    contador +=1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado} en la fecha:: ${completadoEn}`);
                }
            }
            else{

                if (!completadoEn) {
                    contador +=1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
                }   
            }
        });  
    }
    
    toggleCompletadas(ids = []){

        ids.forEach( id => {

            const tarea = this._listado[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString;
            }

        });

    }
}

// exportar la clase de tareas
module.exports = Tareas;