import React, { Component } from "react";
import "./products.css";
import { Heading } from "../heading/heading";
import { ProductModel } from "../../models/product-model";
import axios from "axios";
import { Thumbnail } from "../thumbnail/thumbnail";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { Unsubscribe } from "redux";

interface ProductsState {
    products: ProductModel[];
    previewImage: string;
}

export class Products extends Component<any, ProductsState> {

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            products: store.getState().products,
            previewImage: ""
        };

        this.unsubscribeStore = store.subscribe(() => {
            const products = store.getState().products;
            this.setState({ products });
        })
    }

    // Lifecycle Hooks
    public componentDidMount() {

        //Don't get products from the server if you have them already!
        if (store.getState().products.length > 0) {
            return;
        }

        setTimeout(async () => {

            try {
                const response = await axios.get<ProductModel[]>("http://localhost:3001/products");
                const products = response.data;
                store.dispatch({ type: ActionType.GetAllProducts, payload: products });
                this.setState({ products });
            }
            catch (err) {
                alert("Error: " + err.message);
            }

        }, 2000);

    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    private showPreview = (imageSource: string) => {
        this.setState({ previewImage: imageSource });
    }

    private hidePreview = () => {
        this.setState({ previewImage: "" });
    }

    public render() {
        return (
            <div className="products">

                <Heading>Here are our products: </Heading>

                {this.state.products.length === 0 &&
                    <img src="/assets/images/loading.gif" width="200" alt="Loading" />
                }

                {this.state.products.length > 0 &&

                    <React.Fragment>
                        <NavLink className="insert" to="/products/new" exact>Add new Product</NavLink>

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(p =>
                                    <tr key={p.id}>
                                        <td>
                                            <NavLink to={"/products/" + p.id}>
                                                {p.name}
                                            </NavLink>
                                        </td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <Thumbnail
                                                imageWidth={50}
                                                imageHeight={50}
                                                imageSource={"/assets/images/products/" + p.id + ".jpg"}
                                                userEntersMe={this.showPreview}
                                                userLeftMe={this.hidePreview} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </React.Fragment>
                }

                <img className="preview" src={this.state.previewImage} alt="Preview"
                    style={{ display: this.state.previewImage ? "block" : "none" }} />

            </div>
        );
    }
}