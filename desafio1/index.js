
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName = () => { return `${this.nombre} ${this.apellido}` }

    addMascota = (mascotaNueva) => {
        this.mascotas.push(mascotaNueva)
    }

    getMascotas = () => { //aca debes retornar la cantidad de mascotas del usuario, lo logras retornando la cantidad de elementos dentro del array mascotas
        console.log("------------------------------------------------------------")
        
        console.log(`Hay ${this.mascotas.length} mascotas`)
        
        console.log("lista de mascotas")
        this.mascotas.map(m => {
            console.log(m)
        })
        

    }

    addLibro = (libro, autor) => { //aca debe recibir un string "book" y un string "autor" y debe agregar un objeto asi { nombre: book, autor: autor}
        //al invocar el metodo seria algo asi: usuario.addLibro("libro 3", "Jorge") y con estos datos se crea el objeto pero dentro del metodo, no lo pasas armado ya en el parametro.
        let obj = {}

        obj.nombre = libro
        obj.autor = autor

        this.libros.push(obj)
    }

    getLibros = () => { //en este metodo debes iterar en el array de libros y devolver solo los nombres de los libros, para esto te es muy util el metodo de arrays map
        console.log("------------------------------------------------------------")
        console.log("Nombre de libros")

        this.libros.map(l => {
            console.log(l.nombre)
        })
    }
}

var item

var libros = [
    { 
        nombre: 'libro 1',
        autor: 'nico'
    }, 
    { 
        nombre: 'libro 2',
        autor: 'martin'
    }
];

var usuario = new Usuario(
    'Nicolas',
    'Mendez', 
    libros, 
    [
        'perro',
        'gato'
    ]
)

console.log(usuario.getFullName())

usuario.addMascota('loro')
console.log(usuario.getMascotas())

usuario.addLibro(`libro 3`, `jorge`)
console.log(usuario.getLibros())
