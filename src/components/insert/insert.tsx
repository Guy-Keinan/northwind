import React, { Component, ChangeEvent } from "react";
import "./insert.css";
import { Heading } from "../heading/heading";
import { ProductModel } from "../../models/product-model";
import axios from "axios";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";

interface InsertState {
    product: ProductModel;
    errors: { nameError: string, priceError: string, stockError: string };
}

export class Insert extends Component<any, InsertState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            product: new ProductModel(),
            errors: { nameError: "*", priceError: "*", stockError: "*" }
        };
    }

    private setName = (args: ChangeEvent<HTMLInputElement>) => {
        const name = args.target.value;
        let nameError = "";

        if (name === "") {
            nameError = "Missing name";
        }
        else if (name.length > 30) {
            nameError = "Name too long";
        }

        // this.state.product.name = name; // Don't change state directly!
        const product = { ...this.state.product }; // Spread Operator - שכפול של אובייקט לאוביקט חדש
        product.name = name;
        this.setState({ product });

        const errors = { ...this.state.errors };
        errors.nameError = nameError;
        this.setState({ errors });
    }

    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        const price = args.target.value === "" ? undefined : +args.target.value;
        let priceError = "";

        if (price === undefined) {
            priceError = "Missing price";
        }
        else if (price < 0) {
            priceError = "Price can't be negative";
        }
        else if (price > 10000) {
            priceError = "Price too large"
        }

        const product = { ...this.state.product };
        product.price = price;
        this.setState({ product });

        const errors = { ...this.state.errors };
        errors.priceError = priceError;
        this.setState({ errors });
    }

    private setStock = (args: ChangeEvent<HTMLInputElement>) => {
        const stock = args.target.value === "" ? undefined : +args.target.value;
        let stockError = "";

        if (stock === undefined) {
            stockError = "Missing stock";
        }
        else if (stock < 0) {
            stockError = "Stock can't be negative";
        }
        else if (stock > 10000) {
            stockError = "Stock too large"
        }

        const product = { ...this.state.product };
        product.stock = stock;
        this.setState({ product });

        const errors = { ...this.state.errors };
        errors.stockError = stockError;
        this.setState({ errors });
    }

    private addProduct = async () => {
        try {

            // if(!this.isFormLegal()) {
            //     alert("Please correct all errors.");
            //     return;
            // }

            const response = await axios.post<ProductModel>("http://localhost:3001/products", this.state.product);
            const addedProduct = response.data;
            store.dispatch({ type: ActionType.AddProduct, payload: addedProduct });
            alert("Product has been added! ID: " + addedProduct.id); // בעולם האמיתי לא מציגים קודים של מסד הנתונים
            this.props.history.push("/products"); // Redirect to products page
        }
        catch (err) {
            alert(err.message);
        }
    }

    // private isFormLegal = () => {
    //     return this.state.errors.nameError === "" && 
    //         this.state.errors.priceError === "" && 
    //         this.state.errors.stockError === "";
    // }

    private isFormLegal = () => {
        for (const prop in this.state.errors) {
            if (this.state.errors[prop].toString() !== "") {
                return false;
            }
        }
        return true;
    }

    public render() {
        return (
            <div className="insert">

                <Heading>Add new Product</Heading>

                <input type="text" placeholder="Name..." value={this.state.product.name || ""} onChange={this.setName} />
                <span>{this.state.errors.nameError}</span>
                <br /><br />

                <input type="number" placeholder="Price..." value={this.state.product.price || undefined} onChange={this.setPrice} />
                <span>{this.state.errors.priceError}</span>
                <br /><br />

                <input type="number" placeholder="Stock..." value={this.state.product.stock || undefined} onChange={this.setStock} />
                <span>{this.state.errors.stockError}</span>
                <br /><br />

                <button disabled={!this.isFormLegal()} onClick={this.addProduct}>Add</button>

            </div>
        );
    }
}
