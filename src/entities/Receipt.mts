import {Product} from "./Product.mjs";

export class Receipt {
    // TODO: After adding MongoDB write logic to write the last id + 1 of the last receipt's id
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