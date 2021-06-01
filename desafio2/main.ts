import {Suma} from './suma'
import {Resta} from './resta'

async function operacion(numero1: number, numero2: number, operacion: string): Promise<number> {
    let resultado: number = 0;

    if(operacion === "suma"){
        var suma = new Suma(numero1, numero2)
        return suma.getSuma()
    } else if(operacion === "resta"){
        var resta = new Resta(numero1, numero2)
        return resta.getResta()
    }

    return resultado;
}

async function operaciones(): Promise<void> {
    console.log(await operacion(5, 6, 'suma'))
}

operaciones()