const NombreBD = "DB_Formulario";
const paquetes  = [
    {
        nombre: 'TB_formulario_index',
    },
];
// opcione : {
//     keyPath : 'token'
// }

const DBrequest = window.indexedDB;
const db = DBrequest.open(NombreBD,4);
const CrearPaquete = ({...arg}) =>{
    let dbPaquetes = db.result;
    for(let [id, value] of Object.entries(arg)){
        dbPaquetes.createObjectStore(
                ...value.opcione
                    ? [value.nombre,value.opcione]
                    : [value.nombre,{autoIncrement: true}]
                );
        console.log(`%cPaquete ${value.nombre} Creado exitosamente`,`color:#0dcaf0; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`);
    }

}
db.addEventListener('upgradeneeded', ()=>{
    console.log(`%cCreando la base de datos Nombre: ${db.result.name} Version: ${db.result.version}`,`color:#198754; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`);
    
    CrearPaquete(paquetes);
})
db.addEventListener('success', ()=>{
    console.log(`%cOcurrio una alteracion en la base de datos ${db.result.name}`,`color:#ffc107; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`);
    let obj={};
    for(let [id, value] of Object.entries(db.result.objectStoreNames)){
        obj[`Paquete ${parseInt(id)+1}`] = value;
    }
    obj.NombreBD = db.result.name;
    obj.VersionBD = db.result.version;
    obj['Cantidad Paquetes'] = db.result.objectStoreNames.length;
    console.table(obj);

})
db.addEventListener('error', error=>{
    console.log(`%cOcurrio un error ${error}`,`color:#dc3545; font-family: 'Dosis', sans-serif !important; font-weight: bolder; background-color: #f8f9fa;`);
})