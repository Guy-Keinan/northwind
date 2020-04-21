import React, { Component } from "react";
import "./total-products.css";


interface TotalProductsProps {
    totalProducts: number;
}



export class TotalProducts extends Component<TotalProductsProps>{

    public constructor (props: TotalProductsProps){
        super(props);
    }

    render(){
        return(
            <div className="total-products">
                <h3>We have a total of {this.props.totalProducts} products</h3>
            </div>
        )
    }
}