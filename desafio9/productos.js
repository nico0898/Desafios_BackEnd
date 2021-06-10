let archivo='productos.txt';
const fs = require ('fs');

class Productos {
  listaProductos = [{}];
  
  constructor() {
    // this.listaProductos=[{}]
    this.listaProductos = [
      {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": 1,
        "id": 1
      },
      {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": 2,
        "id": 2
      },
      {
        "title": "Globo terraqueo",
        "price": 345.67,
        "thumbnail": 3,
        "id": 3
      }
    ];
  }
    
  listarProductos() {
    return this.listaProductos;
  }

  listarProductoUnico(id) { 
    return this.listaProductos.filter(f => f.id == id);
  }

  guardarProducto(obj){
    let ultimoProducto = this.listaProductos[this.listaProductos.length-1];
    let id = ultimoProducto.id + 1;

    obj.id = id;

    this.listaProductos.push(obj);

    return obj;
  }

  actualizarProducto(objActualizar){
    let productos = this.listaProductos.map(p => {
      if (p.id == objActualizar.id) {
          p = Object.assign(p, objActualizar);
      }

      return p;
    });

    return productos;
  }

  borrarProducto(id) {
    var productoBorrado = this.listaProductos.filter(a => a.id == id);
    var index = this.listaProductos.findIndex(a => a.id == id);

    this.listaProductos.splice(index, 1);

    return productoBorrado;
  }
}

module.exports = new Productos();