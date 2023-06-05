

export class myDetelle extends HTMLElement{


    constructor(){
        super();
    }


    async component(){
        return await (await fetch("./components/division/division.html")).text();
    }


    connectedCallback(){
        this.component().then(res => this.innerHTML = res);
    }


}

customElements.define("details-bill", myDetelle);