/**
 * Capturamos datos del usuario
 */
const nombreUsuario = prompt('Ingrese su nombre de usuario')
const categoryProducts = prompt('Ingrese categoria las opciones a ingresar son "electrodomestico" o "Accesorio para vehiculo" ')

/**
 * Declaramos objeto productos para ofertas de la semana
 */
const productos = [
    {
        nombreProducto: 'televisor',
        marcaProducto: 'Lg',
        categoria: 'electrodomestico',
        descripcion: 'Tv led plano de 55 pulgadas, su diseño sofisticado que se adapta a cualquier espacio',
        valor: 1000000
    },
    {
        nombreProducto: 'llanta carro',
        marcaProducto: 'Goodyear',
        categoria: 'Accesorio para vehiculo',
        descripcion: 'Llanta 140/70-17, con el mejor aggare',
        valor: 200000
    },
    {
        nombreProducto: 'televisor',
        marcaProducto: 'Kalley',
        categoria: 'electrodomestico',
        descripcion: 'Tv led de 42 pulgadas, rtodos tus contenidos favoritos con imagen 4K-UHD',
        valor: 900000
    },
    {
        nombreProducto: 'televisor',
        marcaProducto: 'Sony',
        categoria: 'electrodomestico',
        descripcion: 'Smart tv de 80 pulgadas, Diseño sin bordes, menos marco, escenas más amplias y sonido nítido',
        valor: 1500000
    }
]
/**
 * Ordenamos el objeto Producto por marcaProducto descendentemente
*/
productos.sort((a, b) => {
    if (a.marcaProducto > b.marcaProducto) {
        return -1;
    }
    if (a.marcaProducto < b.marcaProducto) {
        return 1;
    }
    return 0;
})

/**
  * Muestra los resultados de los calculos
  *  @return {number} muestra los productos del objeto
  */
const dataSearch = document.getElementById('searchOffer')
productos.forEach((producto) => {
    const cardSearch = document.createElement('div')
    cardSearch.innerHTML = `
        <h4> ${producto.nombreProducto} </h4>
        <h3> Marca: ${producto.marcaProducto} </h3>
        <p> Tipo de categoria: ${producto.categoria}</p>
        <p> Descripcion: ${producto.descripcion}</p>
        <span> $${producto.valor} </span>
    `
    dataSearch.append(cardSearch)
})

/**
  * Muestra los resultados de la busqueda por categoria
  *  @return {string} muestra los productos del objeto que coinciden con el parametro de busqueda ingresado por el usuario
  */
const search = productos.filter(productos => productos.categoria == categoryProducts);
let response = '';
search.forEach(search => {
    response += `Resultado de la busqueda por categoria:  ${search.categoria} , nombre del producto: ${search.nombreProducto}, marca del producto: ${search.marcaProducto}, descripcion del producto: ${search.descripcion}, valor: $${search.valor}\n`;
});
alert(response);

/**
  * Devuelve iva dependiendo el pais
  * @return {number} iva del pais.
  */
const captureSelect = () => {
    let countrySelect = document.getElementById('selectCountry').value;
    let iva = 0
    switch (countrySelect) {
        case 'arg':
            return iva = 1.21;
        case 'col':
           return iva = 1.19;
        case 'mex':
            return iva = 1.16;
        default:
            return iva;
    }
}

/**
  * Capturamos datos del input
  * @return {number} iva del pais.
  */
const captureInput = () => {
    let valor = parseInt(document.getElementById('valueProduct').value);
    let ivaCountry = captureSelect()
    let result = calculatePrice(valor, ivaCountry);
    let valueIva = calculateIva(valor, result);
    showResult(result, valueIva);
}

/**
  * Mostramos productos en el select desde un array
  */
function loadProducts() {
    let products = ["Impresora", "Monitor", "Mouse usb", "Mouse inalambrico", "Pc de escritorio", "Pc gamer", "Portatil", "Teclado"]
    let select = document.getElementById('productos')
    for (let i=0; i < products.length; i++) {
        let option = document.createElement("option")
        option.text = products[i]
        select.add(option)
    }
}

/**
  * Calculamos el precio del producto
  *  
  * @param {number} valor El valor del producto.
  * @param {number} iva El valor del iva del pais.
  * @return {number} calculo del precio
  */
const calculatePrice = (valor, iva) => {
    let resultado = valor / iva;
    alert("El valor del producto sin el iva es de $" + resultado)
    return resultado
}

/**
  * Calculamos el iva del producto
  *  
  * @param {number} valor El valor del producto.
  * @param {number} iva El valor del iva del pais.
  * @return {number} calculo del iva del producto
  */
const calculateIva = (valor, iva) => {
    let resultado = valor - iva;
    alert("El valor del iva del producto es de $" + resultado)
    return resultado
}

/**
  * Calculamos el precio de varios productos
  *  
  * @param {number} valor El valor del producto.
  * @param {number} cantProductos cantidad de productos.
  * @return {number} valor de todos los productos
  */
const calculatePriceProduct = (valor, cantProductos) => {
    let resultado = valor * cantProductos
    return resultado
}

/**
  * Muestra los resultados de los calculos
  *  
  * @param {number} result El resultado del calculo
  * @param {number} valueIva El valor del iva
  * @param {number} cantProductos cantidad de productos
  *  @return {string} muestra los resultados del calculo en el index
  */
const showResult = (result, valueIva) => {
    let response = document.getElementById('responseCalculate')
    let data = document.createElement("data")
    
    data = "<p>Hola "+ nombreUsuario + " el valor del producto ingresado antes del iva es de $" + result.toFixed(2) +  ", el valor del iva del articulo ingresado es de $" + valueIva.toFixed(2)+"</p>"
    response.innerHTML = data
}

 




