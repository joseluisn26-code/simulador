// Declaraciones

// Array de todos los Productos
// const productos = [muletas, mueble, kit, tvRetro, estetoscopio, board]
let productos = []

// Query de Elementos

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const itemsSearch = document.querySelector('#itemsSearch');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const botonVaciar = document.querySelector('#btnVaciar');
const miLocalStorage = window.localStorage;
const botonPay = document.getElementById('btnPay');
const searchMarca = document.querySelector('#marca');
const selected = document.querySelector('#productosMarca');
const removedbtn = document.querySelector('#removeMarca');

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
    productos.forEach((info ) => {
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
        const modelo = document.createElement('h6');
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
function renderizarBusquedaProductos(result) {

    result.forEach((info ) => {
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
        const modelo = document.createElement('h6');
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
        itemsSearch.appendChild(miNodo);
    });
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function addProductsToCart(e) {
    carrito.push(e.target.getAttribute('marcador'))
    renderizarCarrito();
    showBtnPay();
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
        const imagen = document.createElement('img');
        imagen.classList.add('img-thumbnail', 'col-sm-2');
        imagen.setAttribute('src', miItem[0].imagen);
        const nodoCarrito = document.createElement('li');
        nodoCarrito.classList.add('list-group-item', 'text-right', 'col-m-12');
        nodoCarrito.textContent = `${numeroUnidadesItem} x ${miItem[0].categoria} - ${divisa} ${miItem[0].precio.toLocaleString()} `;
        nodoCarrito.style.marginLeft = '2rem';
        nodoCarrito.appendChild(imagen);
        const btnQuitar = document.createElement('button');
        btnQuitar.classList.add('btn', 'btn-danger', 'col-m-4');
        btnQuitar.textContent = 'Eliminar';
        btnQuitar.style.marginLeft = '1rem';
        btnQuitar.dataset.item = item;
        btnQuitar.addEventListener('click', removeItemsFromCart);
        nodoCarrito.appendChild(btnQuitar);
        DOMcarrito.appendChild(nodoCarrito);
    });
    DOMtotal.textContent = calculateTotal().toLocaleString();
    showBtnCarrito();
}

/**
* Quitamos elementos del carrito
*/
function removeItemsFromCart(e) {
    const id = e.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
    ocultarBtnPay();
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
    ocultarBtnPay();
    ocultarBtnCarrito();
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

/**
* Habilitamos boton pagar
*/
function showBtnPay() {
    botonPay.disabled = false;
}

/**
*Deshabilitamos boton pagar
*/
function ocultarBtnPay() {
    botonPay.disabled = true;
}

/**
* Deshabilitamos boton vaciar carrito
*/
function ocultarBtnCarrito() {
    btnVaciar.disabled = true;
}

/**
* habilitamos boton vaciar carrito
*/
function showBtnCarrito() {
    btnVaciar.disabled = false;
}

/*
*Ocultar metodo de carga productos
*/
function hideNodeProducts() {
    DOMitems.style.visibility = 'hidden';
}

/**
 * Cargamos al select la marca de los productos
 */
const loadProducts = async () => {
    let products = [];
    const resp = await fetch('json/data.json')
    const data = await resp.json()
    products = data
    products = productos.map(function (elem) {
        let returnObjeto = elem.marca;
        return returnObjeto.toString();
    });
    const dataArr = new Set(products);

  let result = [...dataArr];

    for (let i = 0; i < result.length; i++) {
        let option = document.createElement("option")
        option.text = result[i]
        selected.add(option)
    }
}

/*
* Obtenemos el valor del select
*/
const changeSelect = () => {
    return selected.value;
}

/**
 * busqueda productos por id
 */
const findProductById = (proId) => {
    const result = productos.filter(productos => productos.id === proId);
    return result;
}

/**
 * busqueda productos por categoria
 */
const findProductByCategory = (proCat) => {
    const result = productos.filter(productos => productos.categoria === proCat);
    return result;
}

/**
 * busqueda productos por marca
 */
const findProductByMarca = (proMarc) => {
    const result = productos.filter(productos => productos.marca === proMarc);
    renderizarBusquedaProductos(result);
}

const traerProducts = async () => {
    const resp = await fetch('json/data.json')
    const data = await resp.json()
    productos = data
    renderizarProductos();
}

// EventListeners
selected.addEventListener('change', changeSelect)
searchMarca.addEventListener('click', function () {
    findProductByMarca(selected.value)
});

// evento para eliminar referencia del dom al nodo que se creo para busqueda
removedbtn.addEventListener('click', function () {
    itemsSearch.parentNode.removeChild(itemsSearch);
});

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
    vaciarCarrito();
    ocultarBtnCarrito();
})

// Ejecuciones
traerProducts();
loadProducts();
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();