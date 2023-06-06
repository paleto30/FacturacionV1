

export class raw extends HTMLElement {

    constructor(){
        super();
    }

    async component(){
        return await (await fetch("./components/productsForm/productoRaw.html")).text();
    }

    connectedCallback(){
        this.component().then(res => this.innerHTML = res);
    }

}
customElements.define("p-raw",raw);