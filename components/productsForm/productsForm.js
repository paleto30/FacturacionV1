



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
        let clone =  this.querySelector("#rawP");
      
        clone.querySelectorAll('input','label').forEach(element => {
            let newId = element.id.slice(0,-1);
            element.id = newId+`${this.contador+1}`;
            element.name = newId+`${this.contador+1}`;
            
        });
        this.contador ++;
        return clone;
    }   

    add(e){
        let hijo = this.crearNodo();
        console.log(hijo.parentNode);
        console.log(typeof(hijo.parentNode));
        //this.querySelector("list").insertAdjacentHTML("beforeend",hijo.parentNode)
    }

    connectedCallback(){
        this.component().then(res => {
            this.innerHTML = res;
            this.add =  this.querySelector("#add").addEventListener("click",this.add.bind(this));
            
        }); 
    }
}

customElements.define("form-productos",formProductos);