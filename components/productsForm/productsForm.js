
export class formProductos extends HTMLElement{

    constructor(){
        super();
        this.contador = 0;
    }

    async raw(){
        let data = await (await fetch("./components/productsForm/productoRaw.html")).text();
        return data;
    } 

    async component(){
        let data = await (await fetch("./components/productsForm/productsForm.html")).text();
        return data;
    }


    crearNodo(){
        let element =  this.querySelector("#raw_0");

        let clone = element.cloneNode(true);
        let idclone = clone.id.slice(0,-1);
        clone.id = idclone+`${this.contador+1}`
        clone.querySelectorAll('input').forEach(element => {
            let newId = element.id.slice(0,-1);
            element.id = newId+`${this.contador+1}`;
            element.name = newId+`${this.contador+1}`;
        });
        clone.classList.remove("first")

        this.contador ++;
        return clone;
    }   

    add(e){
        let hijo = this.crearNodo();
        console.log(hijo);
        this.querySelector("#list").appendChild(hijo);
    }

    

    /* 
    facturar(e){        
        console.log("hola");
    }}
    */

    sumar(e){
        let btn = document.querySelector(".btnAdd");
        console.log(btn.parentNode.parentNode);
    } 

    connectedCallback(){

        this.component().then(async res => {
            this.innerHTML = res;
            let html = await this.raw();
            this.list = this.querySelector("#list").innerHTML = html;
            this.list = this.querySelector("#list").insertAdjacentElement("beforeend",this.crearNodo());
            this.add =  this.querySelector("#add").addEventListener("click",this.add.bind(this));
            this.sumar = this.querySelector("#list").addEventListener("click",this.sumar.bind(this));
            /*this.getDato = this.querySelector("#facturar").addEventListener("click",this.facturar.bind(this)); */
        }); 


    }
}

customElements.define("form-productos",formProductos);