



export class formProductos extends HTMLElement{

    constructor(){
        super();

    }

    async component(){
        return await (await fetch("./components/productsForm/productsForm.html")).text();
    }


    connectedCallback(){
        this.component().then(res => this.innerHTML = res);
    }


}

customElements.define("form-productos",formProductos);