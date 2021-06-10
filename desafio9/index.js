// SE IMPORTA EXPRESS PARA SU USO
const express = require('express');

// CREO UNA APP TPO EXPRESS
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//CREO EL ROUTER
const router = express.Router(); 

//DIGO QUE LA APP USE EL ROUTER CREADO
app.use('/api/productos', router);

// PONGO A ESCUCHAR AL SERVIDOR EN SU PUERTO INDICADO
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${server.address().port}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
    res.status(500).json({error : 'ocurrió un error'});
});

//manejo de errores
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).json({error : 'ocurrió un error'});
});

//--------FUNCIONALIDADES

const Productos = require('./productos');

router.get('/', (req,res) => {
  res.render('index');
});

router.get('/listar', (req, res) => {
  try {
    let listaProductos = Productos.listarProductos();
    
    if(listaProductos.length == 0){
      res.json({ Mensaje : 'no hay productos cargados' });
    }else{
      res.json(listaProductos);
    }
  }catch (err) {
    console.error({ error : 'metodo listar - ' + err })
    res.status(500).json({ error : 'metodo listar - ' + err });
  }
});

router.post('/buscar/:id', async (req, res) => {
  try {
    let productoSeleccionado = Productos.listarProductoUnico(req.params.id);

    if (productoSeleccionado.length == 0){
      res.json({ Mensaje : 'producto no encontrado' });
    } else{
      res.json(productoSeleccionado);
    }
  }catch (err) {
    console.error({ error : 'metodo buscar - ' + err })
    res.status(500).json({ error : 'metodo buscar - ' + err });
  }
});

router.post('/guardar', async (req, res) => {
  try {
    let objeto = req.body;

    return res.json(Productos.guardarProducto(objeto));
  } catch (err) {
    console.error({ error : 'metodo guardar - ' + err })
    res.status(500).json({ error : 'metodo guardar - ' + err });
  }
});

router.put('/actualizar', async (req, res) => {
  try {
    let objeto = req.body;

    return res.json(Productos.actualizarProducto(objeto));
  }catch (err) {
    console.error({ error : 'metodo buscar - ' + err })
    res.status(500).json({ error : 'metodo buscar - ' + err });
  }
});

router.delete('/borrar/:id', async (req, res) => {
  try {
    return res.json(Productos.borrarProducto(req.params.id));
  }catch (err) {
    console.error({ error : 'metodo buscar - ' + err })
    res.status(500).json({ error : 'metodo buscar - ' + err });
  }
});




