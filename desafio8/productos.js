let archivo='productos.txt';
const fs = require ('fs');

class Productos {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];
    }

    read(){

     const contenido = fs.readFileSync(archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);
     //Envio objeto
     return JSON.parse(contenido);

   }

   save(objeto){
     console.log(objeto);
     const productos =  this.read();

     let id=productos.length+1;
     let item={
       id:id,
       title:objeto.title,
       price:objeto.price,
       thumbnail:objeto.thumbnail
     }
     productos.push(item);
      fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
     return item;
   }
}

module.exports = new Productos();