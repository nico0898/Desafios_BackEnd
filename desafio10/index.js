const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const router = express.Router(); 
const puerto = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router);

app.engine("hbs", handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static('public'));

//--------FUNCIONALIDADES

const Productos = require('./productos');

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/listar', (req, res) => {
  try {
    let listaProductos = Productos.listarProductos();
    
    if(listaProductos.length == 0){
      res.render('vista', { hayProductos: false, Mensaje : 'No se encontraron productos' });
    }else{
      res.render('vista', { hayProductos: true, productos: listaProductos });
    }
  }catch (err) {
    console.error({ error : 'metodo listar - ' + err })
    res.status(500).json({ error : 'metodo listar - ' + err });
  }
});

router.get('/buscar/:id', async (req, res) => {
  try {
    let productoSeleccionado = Productos.listarProductoUnico(req.params.id);

    if (productoSeleccionado.length == 0){
      res.render('vista', { hayProductos: false, Mensaje : 'Producto no encontrado'});
    } else{
      res.render('vista', { hayProductos: true, productos: productoSeleccionado });
    }
  }catch (err) {
    console.error({ error : 'metodo buscar - ' + err })
    res.status(500).json({ error : 'metodo buscar - ' + err });
  }
});

router.post('/guardar', async (req, res) => {
  try {
    let objeto = req.body;

    Productos.guardarProducto(objeto);
    return res.redirect('/');
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




//-----------------------------------------------------------------------------------

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${server.address().port}`);
});

server.on('error', error => {
  console.log('error en el servidor:', error);
  res.status(500).json({error : 'ocurrió un error'});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).json({error : 'ocurrió un error'});
});
