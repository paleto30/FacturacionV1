import {
loadProducto,
loadCliente

} from "../../api/api.js";


export class formProductos extends HTMLElement {

    constructor() {
        super();
        this.contador = 0;
    }

    async raw() {
        let data = await (await fetch("./components/productsForm/productoRaw.html")).text();
        return data;
    }

    async component() {
        let data = await (await fetch("./components/productsForm/productsForm.html")).text();
        return data;
    }

    // funcion para clonar un nodo
    crearNodo() {
        let element = this.querySelector("#raw_0");
        let clone = element.cloneNode(true);

        let inputs = clone.querySelectorAll('input');
        inputs.forEach(element => {
            element.value = "";
            let id = element.id.slice(0,-1);
            element.id = id+`${this.contador+1}`;
        });

        let idclone = clone.id.slice(0, -1);
        clone.id = idclone + `${this.contador + 1}`
        this.contador++;

        return clone;
    }


    add(e) {
        e.preventDefault();
        let hijo = this.crearNodo();
        this.querySelector("#list").appendChild(hijo);
    }


    clickBtn(e) {
        e.preventDefault()
        //console.log(e.target.classList.contains("btnAdd"));
        if (e.target.classList.contains("btnAdd")) {
            let raw = e.target.parentNode.parentNode;
            let id = raw.id;
            let numeroId = id.charAt(id.length - 1);
            let cantidad = raw.querySelector(`#cantidad_${numeroId}`);
            cantidad.value++;
        } else if (e.target.classList.contains("btnRest")) {
            let nodos = e.target.parentNode.parentNode;
            //console.log(nodos.id);
            if (nodos.id === `raw_${this.contador}`) {
                if (nodos.id !== 'raw_0') {
                    nodos.remove();
                    this.contador = nodos.id.charAt(nodos.id.length - 1) - 1;
                } else {
                    alert("¡ Debe existir como minimo un producto !")
                }
            } else {
                alert("debes eeliminar el ultimo");
            }
        }
    }

    sumar(e) {
        if (e) {
            let btn = document.querySelector("#list");
            btn.addEventListener("click", this.clickBtn.bind(this));
        }
    }


    // funcion para capturar los datos de los inputs  de la factura
    enviarFactura(e) {

        let factura = document.querySelector("#datosFactura");
        let productos = document.querySelector("#list");
        const dataF = factura.getElementsByTagName('input');
        const dataP = productos.getElementsByTagName('input');

        const objectProducts = [];
        let product = {}
        
        Array.from(dataP).forEach((val,id) =>{
            if(id%2==0){
                if(val.name == "cantidad"){
                    product[`${val.name}`] = val.value;
                    objectProducts.push(product);
                    product = {};
                }else{
                    product[`${val.name}`]= val.value;
                }
                
            }
        });

        console.log(objectProducts);
        //console.log(dataF);
        //console.log(dataP);
    }


    // funcion para cargar los datos del producto cuando reconoce el codigo
    loadProductos(e) {
        ///console.log(e.target.classList.contains("loadProduct"));
        if (e.target.classList.contains("loadProduct")) {

            let element = e.srcElement.parentNode.parentNode.parentNode; 
            let id = element.id.charAt(element.id.length -1);
            const cod_producto = element.querySelector(`#cod_producto_${id}`);

            cod_producto.addEventListener('input',async(e)=>{
                
                
                let input =  e.target;
                input.value = input.value.toUpperCase();

                const data = await loadProducto(cod_producto.value);
                if (!data.data) {
                    element.querySelector(`#nombre_producto_${id}`).value = data.nombre_producto;
                    element.querySelector(`#valor_unidad_${id}`).value = data.valor_unidad
                }else{
                    element.querySelector(`#nombre_producto_${id}`).value = "";
                    element.querySelector(`#valor_unidad_${id}`).value = ""
                }

            });
        }
    }



    loadCliente(e){

        if (e.target.classList.contains('cedulas')) {
            
            const datosFactura =  e.srcElement.parentNode.parentNode.parentNode.parentNode;

            let clienteCedula = datosFactura.querySelector("#cedula");
            let clienteNombre = datosFactura.querySelector("#nombre");
            let clienteCorreo = datosFactura.querySelector("#correo");
            let clienteDireccion = datosFactura.querySelector("#direccion");
            let clienteTelefono = datosFactura.querySelector("#telefono");

            clienteCedula.addEventListener('input', async (e) =>{

                const cliente = await loadCliente(clienteCedula.value);

                if (!cliente.message) {
                    clienteCedula.value = cliente.cedula
                    clienteNombre.value = cliente.nombre;
                    clienteCorreo.value = cliente.correo;
                    clienteDireccion.value = cliente.direccion;
                    clienteTelefono.value = cliente.telefono;
                }else{

                    clienteNombre.value = '';
                    clienteCorreo.value = '';
                    clienteDireccion.value = '';
                    clienteTelefono.value = '';
                }
                

            }) 
            
        }
        

    }



    connectedCallback() {

        this.component().then(async res => {
            this.innerHTML = res;
            let html = await this.raw();
            this.list = this.querySelector("#list").innerHTML = html;
            this.querySelector("#list").addEventListener("click", this.sumar(this));
            this.querySelector("#add").addEventListener("click", this.add.bind(this));
            this.querySelector("#facturar").addEventListener("click", this.enviarFactura.bind(this));
            this.querySelector("#list").addEventListener("click", this.loadProductos.bind(this));
            document.querySelector("#datosFactura").addEventListener('click',this.loadCliente.bind(this));
        });


    }
}

customElements.define("seccion-productos", formProductos);