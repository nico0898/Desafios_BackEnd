function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

var http = require("http")

var server = http.createServer((peticion, respuesta) => {
    let obj = {
        id: between(1, 10),
        title: `Producto ${between(1, 10)}`,
        price: between(0.00, 9999.99).toFixed(2),
        thumbnail: `Foto ${between(1, 10)}`
    }

    let jsonObj = JSON.stringify(obj)

    respuesta.end(jsonObj)
})

server.listen(3000, () => {
    console.log(`tu servidor esta listo en ${server.address().port}`)
})
