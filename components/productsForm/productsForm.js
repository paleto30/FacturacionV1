
export class formProductos extends HTMLElement{

    constructor(){
        super();
        this.contador = 0;
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
        this.contador ++;
        return clone;
    }   

    add(e){

        let hijo = this.crearNodo();
        console.log(hijo);
        console.log(typeof(hijo));
        //console.log(typeof(hijo.parentNode));}
        this.querySelector("#list").appendChild(hijo);
    }

    connectedCallback(){
        this.component().then(res => {
            this.innerHTML = res;
            this.add =  this.querySelector("#add").addEventListener("click",this.add.bind(this));
            
        }); 
    }
}

customElements.define("form-productos",formProductos);