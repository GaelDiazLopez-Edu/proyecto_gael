let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const totalElement = document.querySelector("#total");
const numerito = document.querySelector("#numerito");
const botonVaciar = document.querySelector("#vaciar-carrito");
const botonComprar = document.querySelector("#comprar-ahora");

function cargarProductosCarrito() {
    if (productosEnCarrito.length > 0) {
        contenedorCarrito.innerHTML = productosEnCarrito.map(producto => `
            <div class="producto-carrito">
                <img src="../img/${producto.categoria.id}/${producto.id.split('-')[1]}.jpg" alt="${producto.titulo}">
                <h3 class="producto-carrito-titulo">${producto.titulo}</h3>
                <p class="producto-carrito-cantidad">${producto.cantidad}</p>
                <p class="producto-carrito-precio">$${producto.precio}</p>
                <p class="producto-carrito-subtotal">$${producto.precio * producto.cantidad}</p>
                <button class="eliminar-producto" onclick="eliminarDelCarrito('${producto.id}')">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `).join('');
    } else {
        contenedorCarrito.innerHTML = `
            <p class="carrito-vacio">Tu carrito está vacío <i class="bi bi-emoji-frown"></i></p>
        `;
    }
    actualizarTotal();
    actualizarNumerito();
}

function eliminarDelCarrito(id) {
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalElement.innerText = total;
}

function actualizarNumerito() {
    numerito.innerText = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
}

botonVaciar.addEventListener("click", () => {
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
});

botonComprar.addEventListener("click", () => {
    if (productosEnCarrito.length) {
        productosEnCarrito = [];
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        alert("¡Gracias por tu compra!");
    }
});

cargarProductosCarrito();
