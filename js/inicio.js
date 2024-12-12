document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-menu");
    const tituloPrincipal = document.querySelector(".titulo");
    const numerito = document.querySelector("#numerito");

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
                    <img class="producto-imagen" src="../../img/${producto.categoria.id}/${producto.id.split('-')[1]}.jpg" alt="${producto.titulo}">
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
});
