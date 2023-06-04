
export class myHead extends HTMLElement{

    constructor(){
        super();

    }


    async components(){
        return await (await fetch("./components/header/header.html")).text();
    }


    connectedCallback(){
        this.components().then((res) =>{
            this.innerHTML = res;
        }) 
    }

}


customElements.define('my-head',myHead);