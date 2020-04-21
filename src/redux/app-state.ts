import { ProductModel } from "../models/product-model";

export class AppState {
    public products: ProductModel[];

    public constructor() {
        this.products = [];
    }
}