const express = require('express');
const app = express();
const puerto = 8080;
const fs=require ('fs');

let visitasItems=0;
let visitasItem=0;
let archivo = 'productos.txt';

app.get('/items', async (req, res) => {
    //adicion contador de visitas
    visitasItems++;

    //leo archivo
    const contenido = await fs.promises.readFile(archivo,'utf-8');
    const productos=JSON.parse(contenido);
    const cant=productos.length;

    //armo objeto para enviar
    const objeto={
          items: productos,
          cantidad: cant
    };
    //console.log(objeto);
    //res.send(objeto);

    //Envio objeto
    res.type('json').send(JSON.stringify(objeto, null, 2) + '\n');
});

app.get('/item-random', async (req, res) => {
    
    visitasItem++;

    const contenido = await fs.promises.readFile(archivo,'utf-8');
    const productos=JSON.parse(contenido);
    const cant=productos.length;
    const item=Math.floor(Math.random() * (productos.length));
    
    const objeto={
      item: productos[item]
    };

    res.type('json').send(JSON.stringify(productos[item], null, 2) + '\n');
});

app.get('/visitas', (req, res) => {
    
    const objeto={
        visitas: {
        items: visitasItems,
        item: visitasItem
        }
    };
  
    res.type('json').send(JSON.stringify(objeto, null, 2) + '\n');
});

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});