

export class Formulario extends HTMLElement{

    constructor(){
        super();
    }  


    async components(){
        return await (await fetch("./components/form/formulario.html")).text();
    }

     connectedCallback(){

        console.log(this.components());
        this.components().then((res) => this.innerHTML = res); 
    }

}

customElements.define("form-1",Formulario);
