
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

const captureInput = () => {
    let valor = parseInt(document.getElementById('valueProduct').value);
    let ivaCountry = captureSelect()
    let result = calculatePrice(valor, ivaCountry);
    let valueIva = calculateIva(valor, result);
    showResult(result, valueIva)
}

function loadProducts() {
    let products = ["Impresora", "Monitor", "Mouse usb", "Mouse inalambrico", "Pc de escritorio", "Pc gamer", "Portatil", "Teclado"]
    let select = document.getElementById('productos')
    for (let i=0; i < products.length; i++) {
        let option = document.createElement("option")
        option.text = products[i]
        select.add(option)
    }
}

const calculatePrice = (valor, iva) => {
    let resultado = valor / iva;
    alert("El valor del producto sin el iva es de $" + resultado)
    return resultado
}

const calculateIva = (valor, iva) => {
    let resultado = valor - iva;
    alert("El valor del iva del producto es de $" + resultado)
    return resultado
}

const showResult = (result, valueIva) => {
    let response = document.getElementById('responseCalculate')
    let data = document.createElement("data")
    data = "<p>El valor del producto ingresado antes del iva es de $" + result.toFixed(2) +  ", el valor del iva del articulo ingresado es de $" + valueIva.toFixed(2)+ "</p>"
    response.innerHTML = data
}



