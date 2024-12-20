export class ProductResponse{
    id: string;
    name: string;
    description: string;
    vendor: string;
    price: number;
    stock_quantity: number;
    url: string;

    constructor(
        id: string, 
        name: string, 
        description: string,
        vendor: string,
        price: number,
        stock_quantity: number,
        url: string
    ){
        this.id = id;
        this.description = description;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.url = url;
        this.vendor = vendor
    }
}