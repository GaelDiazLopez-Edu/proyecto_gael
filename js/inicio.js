document.addEventListener("DOMContentLoaded", () => {
    let productos = [];
    const productosContainer = document.getElementById("contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-menu");
    const tituloPrincipal = document.querySelector(".titulo");
    const numerito = document.querySelector("#numerito");
    const menuToggle = document.getElementById('menu-toggle');
    const menuLateral = document.querySelector('.menu-lateral');


    menuToggle.addEventListener('click', () => {
        menuLateral.classList.toggle('visible');
    });

    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((data) => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    function mostrarProductos(productosElegidos) {
        productosContainer.innerHTML = "";
        productosElegidos.forEach((producto) => {
            const productoHTML = `
                <div class="producto">
                    <img class="producto-imagen" src="../img/${producto.categoria.id}/${producto.id.split('-')[1]}.jpg" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });
        actualizarBotonesAgregar();
    }

    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("boton-carrito")) return;
            
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria[0].categoria.nombre;
                mostrarProductos(productoCategoria);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                mostrarProductos(productos);
            }
        });
    });

    function actualizarBotonesAgregar() {
        const botonesAgregar = document.querySelectorAll(".producto-agregar");
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }

    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    function agregarAlCarrito(e) {
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);

        if(productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumerito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }

    actualizarNumerito();
});
