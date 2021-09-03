const Header = (data)=>{
    return new Promise((resolve)=>{
        resolve(`
        <a  class="navbar-brand" href="#">
            <img src="${data.Logo}" alt="" width="30" class="d-inline-block align-text-top">
                ${data.Nombre}
        </a>`);
    })
}
const Menus = (data)=>{
    let menus = "";
    for(let [id, value] of Object.entries(data.Menus)){
        if(value.Mensaje!=""){
            menus += `
            <li class="nav-item">
                <a class="nav-link active position-relative" aria-current="page" href="${value.Url}" target="_blank">${value.Nombre}
                    <span class="position-absolute start-100 translate-middle badge rounded-0 bg-dark" style="left: 6.5em !important; top: .9em !important;">
                    ${value.Mensaje}
                    <span class="visually-hidden"></span>
                    </span>
                </a>
            </li>`;
        }else{
            menus += `
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="modal" href="${value.Url}" role="button">${value.Nombre}</a>
            </li> `;
        }
    }
    return new Promise((resolve)=>{
        resolve(menus);
    })
}
const Presentaciones = (data)=>{
    let presentaciones = "";
    for(let [id, value] of Object.entries(data.Presentaciones)){
        presentaciones += `
        <div class="carousel-item ${value.Iniciar}">
            <img src="${value.Img}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-block d-md-none">
                <h5>${value.Titulo}</h5>
                <p>${value.Contenido}</p>
            </div>
        </div>`;
    }
    return new Promise((resolve)=>{
        resolve(presentaciones);
    })
}
const Formulario = (data)=>{
    let formulario = {};
    formulario.Titulo = data.Formulario.Titulo;
    for(let [id, value] of Object.entries([data.Formulario])){
        formulario.Cuerpo = `
        <h5 class="card-title">${value.Descripcion}</h5>
            <p class="card-text">${value.Contenido}</p>
            <a class="btn btn-primary position-relative rounded-0" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">${value.Boton}
                <span id="mensajeTotal" class="position-absolute top-0 start-100 translate-middle badge rounded-0 bg-danger">
                ${value.Mensaje}
                    <span class="visually-hidden"></span>
             </a>`;
    }
    return new Promise((resolve)=>{
        resolve(formulario);
    })
}
const VentanaMenus = (data)=>{
    return new Promise((resolve)=>{
        resolve(data.VentanaMenus.Titulo);
    })
}
self.addEventListener("message", async(e)=>{
    let fichero = await fetch(e.data.url);
    let data = await fichero.json();
    let [header, menus, presentaciones,formulario,ventanaMenus] = await Promise.all([
        Header(data),
        Menus(data),
        Presentaciones(data),
        Formulario(data),
        VentanaMenus(data)
    ]);
    postMessage({header, menus,presentaciones,formulario,ventanaMenus});
})