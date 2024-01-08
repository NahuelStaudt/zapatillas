// const carrito = recuperarCarrito()
const contenedorZapatillas = document.querySelector("#divcontenedor");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const filtrarZapatillas = document.querySelector ("#filtrarZapatillas");
const URL = 'js/productos.json';

const carrito = []
const productos = []

async function cargarProductos() {
    try {
        const respuesta = await fetch(URL);
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

async function ProductosHTML(producto) {
    const productos = await cargarProductos();
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;
        contenedorZapatillas.appendChild(div);
    });
}
ProductosHTML();

function agregarClickEnBtnCards() {
    const botonesAgregar = document.querySelectorAll("button.producto-agregar")
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach((boton)=> {
            boton.addEventListener("click", ()=> {
                let productosSeleccionados = productos.find((producto) => producto.id === parseInt(boton.id))
                carrito.push(productoSeleccionado)
                console.log("Producto agregado al carrito:", boton.id)
            })
        })
    }
}




filtrarZapatillas.addEventListener("search", ()=> {
    let param = filtrarZapatillas.value.trim().toLowerCase()
    let productosResultantes = productos.filter((producto)=> producto.nombre.toLowerCase().includes(param))
    cargarProductos(productosResultantes)
})




// function recuperarCarrito() {
//     if (JSON.parse(localStorage.getItem("miCarrito"))) {
//         return JSON.parse(localStorage.getItem("miCarrito"))
//     } else {
//         return []
//     }
// }