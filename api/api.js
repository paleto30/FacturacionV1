

const endpoint = "http://localhost/backFactura/api";




export const getAllProductos = async()=>{

    try {
        const data = await fetch(`${endpoint}/producto/`);
        const res = await data.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const loadProducto = async(cod_producto) => {

    try {
        const dato = await fetch(`${endpoint}/producto/load?cod_producto=${cod_producto}`);
        const res = await dato.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const loadCliente = async (cedula)=>{

    try {
        const dato = await fetch(`${endpoint}/cliente/load?cedula=${cedula}`); 
        const result = dato.json();
        return result;
    } catch (error) {
        console.log(error);
    }

}