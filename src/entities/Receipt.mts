import {Product} from "./Product.mjs";

export class Receipt {
    name: string
    surname: string
    address: string
    product: Product[]
    quantity: number
    price: number
    orderDate: Date
    constructor(name, surname, address, product, quantity, price) {
        this.name = name
        this.surname = surname
        this.address = address
        this.product = product
        this.quantity = quantity
        this.price = price
        this.orderDate = new Date()
    }
}