export class Suma {
    numero1: number
    numero2: number

    constructor(numero1: number, numero2: number){
        this.numero1 = numero1
        this.numero2 = numero2
    }

    async getSuma() {
        return this.numero1 + this.numero2
    }
}