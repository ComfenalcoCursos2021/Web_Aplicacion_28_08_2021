addEventListener("DOMContentLoaded", async(e)=>{
    let fragmenCards = new DocumentFragment();
    let fragmenTabla = new DocumentFragment();
    let LISTACARDS = document.querySelector("#listaCards");
    let LISTATABLA = document.querySelector("#listaTabla");
    fragmenCards.appendChild(LISTACARDS);
    let buscarData = {
        informacion : {},
        configuracion:{
            tabla: 'TB_formulario_index',
            opcion: 'readonly'
        }  
    }
    setTimeout(() => {
        buscarDatosPaquetes(buscarData);
    }, 1000);
    let contador = 0;
    const config = new Worker('./main.js');
    config.postMessage({url: './config.json'});
    config.addEventListener("message", (e)=>{
        document.querySelector("#header").insertAdjacentHTML('afterbegin',e.data.header);
        document.querySelector("#menus").insertAdjacentHTML('afterbegin',e.data.menus);
        document.querySelector("#presentaciones").insertAdjacentHTML('afterbegin',e.data.presentaciones);
        document.querySelector("#formularioTitulo").insertAdjacentHTML('afterbegin',e.data.formulario.Titulo);
        document.querySelector("#formularioCuerpo").insertAdjacentHTML('afterbegin',e.data.formulario.Cuerpo);
        document.querySelector("#ventanaMenus").insertAdjacentHTML('afterbegin',e.data.ventanaMenus);
        config.terminate();
    })
    
    //Guardar datos del formulario de inicio
    const myForm = document.querySelector("#myFormulario");
    myForm.addEventListener('submit', (e)=>{
        const myInput = Array.from(myForm);
        myInput.pop();
        let data = {};
        for(let [id, value] of Object.entries(myInput)){
            data[`${value.id}`] = { 
                objeto : value.value,
                mensaje : document.querySelector([`#${value.id}-Help`]).textContent
            };

        }
        LISTACARDS.innerHTML = "";
        LISTATABLA.innerHTML = "";
        fragmenCards.appendChild(document.querySelector("#listaCards"));
        let guardarData = {
            informacion : {
                data,
            },
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readwrite'
            }   
        }
        guardarDatosPaquetes(guardarData);
        buscarDatosPaquetes(buscarData);
        e.preventDefault();
    })
    
    addEventListener('message', (e)=>{
        if(e.data){
            contador++;
            listaCards(Object.values(e.data.data)[0]);
            listaTabla(Object.values(e.data.data)[0])
        }else{
            let myTotal = document.querySelector("#mensajeTotal");
            myTotal.innerHTML = "";
            myTotal.insertAdjacentHTML('afterbegin', contador);
            document.body.appendChild(fragmenCards.children[0]);
            LISTATABLA.appendChild(fragmenTabla);
        }
    })
    const listaCards = ({...arg})=>{   
        let div = document.createElement('DIV'); 
        div.classList.add('d-flex');
        div.classList.add('position-relative');
        div.classList.add('mt-2');
        div.classList.add('border');
        let img = document.createElement('IMG');
        img.src = arg['Imagen-Certificado'].objeto;
        div.classList.add('flex-shrink-0');
        div.classList.add('me-3');
        div.classList.add('border');
        img.width = 150;
        img.height = 150;
        img.title = arg['Imagen-Certificado'].mensaje;
        img.alt = arg['Imagen-Certificado'].mensaje;
        let div2 = document.createElement('div');
        let h5 = document.createElement('H5');
        h5.classList.add('mt-0');
        h5.innerText = arg['Nombre-Certificado'].objeto;
        let span = document.createElement('SPAN');
        span.classList.add('badge');
        span.classList.add('bg-secondary');
        span.innerText = arg['Fecha-Certificado'].objeto;
        let p = document.createElement('P');
        p.innerText = arg['Descripcion-Certificado'].objeto;
        div.appendChild(img);
        h5.appendChild(span);
        div2.appendChild(h5);
        div2.appendChild(p);
        div.appendChild(div2);
        fragmenCards.children.listaCards.appendChild(div);
    }
    const listaTabla = ({...arg})=>{   
        let tr = document.createElement('TR'); 
        for(let [id, value] of Object.entries(arg)){
            let td = document.createElement('TD');
            if(id=="Imagen-Certificado"){
                td.title =  value.mensaje;
                let a = document.createElement('A'); 
                a.href = value.objeto;
                a.target = "_blank";
                a.innerText = "Click"
                td.appendChild(a);
                tr.appendChild(td);
            }else{
                td.title =  value.mensaje;
                td.innerText =  value.objeto;
                tr.appendChild(td);
            }
            
        }
        fragmenTabla.appendChild(tr);
    }
})
