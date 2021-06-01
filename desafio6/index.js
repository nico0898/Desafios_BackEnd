
// const { rejects } = require("assert/strict");
const fs = require("fs");
// const { fchmod, stat } = require("fs/promises");
// const { resolve } = require("node:path");

class Archivo {
    constructor(file){
        this.file = file;
    }

    async leerArchivo() {
        try{
            let request = await this.fileExist(this.file).then(exist => {
                if(exist){
                    return fs.promises.readFile(this.file, "utf-8").then(contenido => {
                        if(contenido === ""){
                            return "Archivo vacio";
                        }else{
                            return JSON.parse(contenido);
                        }
                    });
                } else{
                    return "El archivo no existe. Debe crear uno.";
                }
            }).catch(err => console.log(err))

            return request;
        }
        catch(err){
            console.log(err);
        }
    }

    async guardarArchivo(producto) {

        try{
            let request = await this.fileExist(this.file).then(exist => {
                if(exist){
                    return fs.promises.readFile(this.file, "utf-8").then(contenido =>{
                        if(contenido === ""){
                            let json = [];
    
                            producto.id = 1;
                            json.push(producto);
    
                            fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))
                        } else{
                            let json = JSON.parse(contenido);
    
                            producto.id = json.length+1;
                            json.push(producto);
                            
                            fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"));
                        }
                        
                        return "El archivo se cargo con éxito."
                    });
                } else{
                    return "El archivo no existe. Debe crear uno.";
                }
            }).catch(err => console.log(err))

            return request;
        }
        catch(err){
            console.log(err);
        }
    }

    async borrarArchivo() {
        try{
            await fs.promises.unlink(this.file);
            console.log("Archivo eliminado");
        }
        catch(err){
            console.log("El archivo no existe o hubo una falla al borrarlo");
        }
    }

    fileExist(file) {
        return new Promise((resolve, rejects) => {
            fs.stat(file, (err, stats) => {
                if(err){
                    if(err.code === "ENOENT"){
                        resolve(false);
                    } else{
                        rejects(err);
                    }
                }

                // resolve(stats.isFile())
                resolve(true);
            });
        });
    };
}

//PRUEBAS DEL FUNCIONAMIENTO DEL ARCHIVO

const archivo = new Archivo("./productos.txt");

//--------------leer archivo
// archivo.leerArchivo().then(contenido => {
//         console.log(contenido);
// }).catch(err => {
//     console.log(err);
// });

//--------------guardar archivo
// var obj = {
//     "title": "objeto 1",
//     "price": 100.05,
//     "thumbnail": "foto 1",
// }

// archivo.guardarArchivo(obj).then(contenido => {
//     console.log(contenido);
// });

//--------------borrar archivo
// archivo.borrarArchivo();