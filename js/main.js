// Declaraciones

// Array de todos los Productos
const productos = [muletas, mueble, kit, tvRetro, estetoscopio, board]

document.addEventListener('DOMContentLoaded', () => {

    // Query de Elementos

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const botonVaciar = document.querySelector('#btnVaciar');
    const miLocalStorage = window.localStorage;
    const botonPay = document.querySelector('#btnPay')

    // Funciones

    /**
    * Ordenamos el objeto Producto por categoria alfabeticamente
    */
    productos.sort((a, b) => {
        if (a.categoria < b.categoria) {
            return -1;
        }
        if (a.categoria > b.categoria) {
            return 1;
        }
        return 0;
    })

    /**
    * Pinta los productos dinamicamente a partir del array productos
    */
    function renderizarProductos() {
        productos.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            const cardProduct = document.createElement('div');
            cardProduct.classList.add('card-body');
            const title = document.createElement('h4');
            title.classList.add('card-title');
            title.textContent = info.categoria;
            const marca = document.createElement('h5');
            marca.classList.add('card-title');
            marca.textContent = info.marca;
            const  modelo = document.createElement('h6');
            modelo.classList.add('card-title');
            modelo.textContent = info.modelo;
            const imagen = document.createElement('img');
            imagen.classList.add('img-fluid');
            imagen.setAttribute('src', info.imagen);
            const descripcion = document.createElement('p');
            descripcion.classList.add('card-title');
            descripcion.textContent = info.descripcion;
            const precio = document.createElement('p');
            precio.classList.add('card-text');
            precio.textContent = `${divisa}${info.precio}`;
            const boton = document.createElement('button');
            boton.classList.add('btn', 'btn-primary');
            boton.textContent = 'Agregar al carrito';
            boton.setAttribute('marcador', info.id);
            boton.addEventListener('click', addProductsToCart);

            // Insertamos los nodos a la card de productos
            cardProduct.appendChild(imagen);
            cardProduct.appendChild(title);
            cardProduct.appendChild(marca);
            cardProduct.appendChild(modelo);
            cardProduct.appendChild(precio);
            cardProduct.appendChild(descripcion);
            cardProduct.appendChild(boton);
            miNodo.appendChild(cardProduct);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function addProductsToCart(e) {
        carrito.push(e.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    /**
    * Mostramos  agregados por el usuario al carrito
    */
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = productos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].categoria} - ${divisa} ${miItem[0].precio}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'Eliminar del carrito';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', removeItemsFromCart);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calculateTotal();
    }

    /**
    * Quitamos elementos del carrito
    */
    function removeItemsFromCart(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    /**
     * Calculamos el valor total
     */
    const calculateTotal = () => {
        return carrito.reduce((total, item) => {
            const miItem = productos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0);
    }

    /**
    * Vaciamos el carrito
    */
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    /**
    * Guardamos carrito en el storage
    */
    const guardarCarritoEnLocalStorage = () => {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    /**
    * Cargamos lo guardado en el carrito previamente en el storage
    */
    const cargarCarritoDeLocalStorage = () => {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }


    // EventListeners
    botonVaciar.addEventListener('click', vaciarCarrito);
    botonPay.addEventListener('click', () => {
        Swal.fire({
            title: 'Gracias por su compra',
            text: 'Revise los detalles de su compra en su correo',
            icon: 'success',
            html: `<h1>Venta realizada</h1>
            <p>Lo esperamos de nuevo pronto</p>
            `,
        });
    })

    // Ejecuciones
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});