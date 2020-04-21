import React, { Component } from "react";
import "./details.css";
import { Heading } from "../heading/heading";
import { ProductModel } from "../../models/product-model";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";

interface DetailsState {
    product: ProductModel;
}

export class Details extends Component<any, DetailsState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            product: new ProductModel()
        };
    }

    public async componentDidMount() {


        try {
            const id = +this.props.match.params.prodID;
            const product = store.getState().products.find(p => p.id === id);
            this.setState({ product });
        }
        catch (err) {
            alert(err.message);
        }
    }

    public render() {
        return (
            <div className="details">

                <Heading>Product Details</Heading>

                {/* הציגו את המוצר על הדף */}
                {/* יש לראות גם שם גם מחיר גם מלאי וגם תמונה */}

                <h3>Name: {this.state.product.name}</h3>
                <h3>Price: {this.state.product.price}</h3>
                <h3>Stock: {this.state.product.stock}</h3>
                <img src={"/assets/images/products/" + this.state.product.id + ".jpg"} alt="product" />
                <br /><br />
                <NavLink to="/products">Back to List</NavLink>

            </div>
        );
    }
}