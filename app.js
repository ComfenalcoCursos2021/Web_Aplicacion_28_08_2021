addEventListener("DOMContentLoaded", (e)=>{
    const config = new Worker('./main.js');
    config.postMessage({url: './config.json'});
    config.addEventListener("message", (e)=>{
        
        console.log(e.data);

        document.querySelector("#header").insertAdjacentHTML('afterbegin',e.data.header);
        document.querySelector("#menus").insertAdjacentHTML('afterbegin',e.data.menus);
        document.querySelector("#presentaciones").insertAdjacentHTML('afterbegin',e.data.presentaciones);
        document.querySelector("#formularioTitulo").insertAdjacentHTML('afterbegin',e.data.formulario.Titulo);
        document.querySelector("#formularioCuerpo").insertAdjacentHTML('afterbegin',e.data.formulario.Cuerpo);
        document.querySelector("#ventanaMenus").insertAdjacentHTML('afterbegin',e.data.ventanaMenus);
    })
})