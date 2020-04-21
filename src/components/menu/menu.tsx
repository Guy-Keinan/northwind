import React, { Component } from "react";
import "./menu.css";
import { NavLink } from "react-router-dom";
import { ProductModel } from "../../models/product-model";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";

export class Menu extends Component {

    public demoInsert = () => {
        const demoProduct = new ProductModel(this.rnd(), this.rnd().toString(), this.rnd(),this.rnd());
        store.dispatch({type: ActionType.AddProduct, payload: demoProduct})
    }

    private rnd(): number {
        return Math.floor(Math.random() * 100);
    }
    public render() {
        return (
            <div className="menu">

                <NavLink to="/home" exact>Home</NavLink>

                <NavLink to="/products" exact>Products</NavLink>

                <NavLink to="/about" exact>About</NavLink>


                <button onClick={this.demoInsert}> Demo insert</button>
            </div>
        );
    }
}