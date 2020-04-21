import React, { Component } from "react";
import "./about.css";
import { FreeItem } from "../free-item/free-item";
import { Gifts } from "../gifts/gifts";
import { Heading } from "../heading/heading";
import { Thumbnail } from "../thumbnail/thumbnail";

export class About extends Component {
    public render() {
        return (
            <div className="about">

                <Heading>Exotic Products from Around the World</Heading>

                <FreeItem countItemsToBuy={4} />
                
                <Gifts minGifts={4} maxGifts={8} />

                <Thumbnail imageWidth={100} imageHeight={80} imageSource="/assets/images/home.png" />

            </div>
        );
    }
}