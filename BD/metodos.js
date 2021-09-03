const guardarDatosPaquetes = ({...arg})=>{
    const dbGuardar = db.result;
    const dbTran = dbGuardar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    const respuesta = (dbStora.keyPath)
    ?( 
        (arg.informacion[dbStora.keyPath])
            ? arg.informacion
            : `No estas enviando la keyPath '${dbStora.keyPath}' al paquete ${arg.configuracion.tabla}`
    ): arg.informacion;
    (respuesta instanceof Object)
        ?(
            dbStora.add(arg.informacion),
            dbTran.addEventListener('complete', (e)=>{
                console.log(`%cDatos Guardados, tiempo estimado: ${e.timeStamp}`,`color:#20c997; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`);
            })
        )
        :(console.log(`%c${respuesta}`,`color:#fd7e14; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`));
}
const buscarDatosPaquetes = ({...arg})=>{
    const dbBuscar = db.result;
    const dbTran = dbBuscar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    const cursor = dbStora.openCursor(
                    (arg.informacion.token) 
                        ? arg.informacion.token
                        : undefined);
    cursor.addEventListener('success', (e)=>{
        const dbCursor = e.target.result;
        if(dbCursor){
            postMessage({data: dbCursor.value, tb:arg.configuracion.tabla});
            dbCursor.continue();
        }else{
            postMessage(false);
        }
    })
    
}
const AcualizarDatosPaquetes = ({...arg})=>{
    const dbActualizar = db.result;
    const dbTran = dbActualizar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    const respuesta = (dbStora.keyPath)
    ?( 
        (arg.informacion[dbStora.keyPath])
            ? arg.informacion
            : `No estas enviando la keyPath del paquete ${arg.configuracion.tabla}`
    ): arg.informacion;
    (respuesta instanceof Object)
        ?(
            dbStora.put(arg.informacion),
            dbTran.addEventListener('complete', (e)=>{
                console.warn("Datos Actualizados", e);
            })
        )
        :(console.log(respuesta));
}
const EliminarDatosPaquetes = ({...arg})=>{
    const dbEliminar = db.result;
    const dbTran = dbEliminar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    const respuesta = (dbStora.keyPath)
    ?( 
        (arg.informacion[dbStora.keyPath])
            ? arg.informacion
            : `No estas enviando la keyPath del paquete ${arg.configuracion.tabla}`
    ): arg.informacion;
    (respuesta instanceof Object)
        ?(
            dbStora.delete(...Object.values(respuesta)),
            dbTran.addEventListener('complete', (e)=>{
                console.warn("Datos Eliminados", e);
            })
        )
        :(console.log(respuesta));
}