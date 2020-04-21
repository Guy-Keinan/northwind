import React, { Component } from "react";
import "./free-item.css";

interface FreeItemProps {
    countItemsToBuy: number;
}

export class FreeItem extends Component<FreeItemProps> {

    public constructor(props: FreeItemProps) {
        super(props);
    }

    public render() {
        return (
            <div className="free-item">
                <h4>Buy {this.props.countItemsToBuy} products, get one for free!</h4>
            </div>
        );
    }
}