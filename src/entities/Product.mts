export class Product {
    productName: string;
    productDescription: string;
    productQty: number;
    price: number;

    constructor(productName: string, productDescription: string, productQty: number, price: number) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.productQty = productQty;
        this.price = price;
    }
}