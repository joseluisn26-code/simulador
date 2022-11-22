// Declaracion de Clase, creacion de objetos 

class Productos {
    constructor(id, categoria, marca, modelo, precio, imagen, descripcion) {
        this.id = id
        this.categoria = categoria
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
        this.imagen = imagen
        this.descripcion = descripcion
    }
}

const muletas = new Productos(1,'Muletas','Importadas','Axilares', 100000,'./img/producto-1.jpg','Somos la mejor empresa de ortopédicos, líderes en el mercado nacional')
const mueble = new Productos(2,'Mueble computador con silla','Generico','A-4895X', 850000,'./img/producto-2.jpg','Somos lideres, todos nuestros productos son hechos con materiales ayudan al medio ambiente')
const kit = new Productos(3,'Kit optometria','104 lentes','A803006-62', 700000,'./img/producto-3.jpg','Somos la mejor empresa de implementos de optometria, contamos con aliados estrategicos en distintos paises')
const tvRetro = new Productos(4,'Tv retro','Generico','A-4895X', 850000,'./img/producto-4.jpg','Somos lideres, todos nuestros productos son hechos con materiales ayudan al medio ambiente')
const estetoscopio = new Productos(5,'Estetoscopio','Generico','Ax-249', 200000,'./img/producto-5.jpg','Somos lideres contamos con los mejores productos, contactanos')
const board = new Productos(6,'Board','Msi','Ms-41254', 550000,'./img/producto-6.jpg','Contamos con los mejores productos a los mejores precios, todo lo tenemos a un solo clic')

