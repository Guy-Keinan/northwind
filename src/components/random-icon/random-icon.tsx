import React, { Component } from "react";
import "./random-icon.css";

interface RandomIconState {
    chosenIcon: number;
}

export class RandomIcon extends Component<any, RandomIconState>{

    public constructor(props: any) {
        super(props);
        const img: number = Math.floor(Math.random() * 5 + 1);
        this.state = {
            chosenIcon: img
        }
    }


    render() {
        return (
            <div className="random-icon">
                <h4>Random Icon: <img src={`/assets/images/${this.state.chosenIcon}.png`}/> </h4>
            </div>
        )
    }
}