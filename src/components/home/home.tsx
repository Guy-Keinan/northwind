import React, { Component, ChangeEvent } from "react";
import "./home.css";
import { Heading } from "../heading/heading";
import { Clock } from "../clock/clock";

interface HomeState {
    currentDiscount: number;
    imageWidth: number;
    vegetables: string[];
    color: string;
    regions: string[]
}

export class Home extends Component<any, HomeState> {

    private homeImage: HTMLImageElement;

    public constructor(props: any) {
        super(props);
        this.state = {
            currentDiscount: 12,
            imageWidth: 300,
            vegetables: ["Carrots", "Onions", "Potatoes", "Tomatoes"],
            color: "Black",
            regions: ["North", "South", "East", "West"]
        };
    }

    private getMonth(): string {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        const mm = date.getMonth();
        return months[mm];
    }

    private decreaseImage = () => {
        if (this.state.imageWidth > 100) {
            const imageWidth = this.state.imageWidth - 10;
            this.setState({ imageWidth });
        }
    }

    private resetImage = () => {
        this.setState({ imageWidth: 300 });
    }

    private increaseImage = () => {
        if (this.state.imageWidth < 500) {
            const imageWidth = this.state.imageWidth + 10;
            this.setState({ imageWidth });
        }
    }

    private changeImageWidth = (args: ChangeEvent<HTMLInputElement>) => {
        // args = אובייקט המכיל מידע לגבי הארוע שהתרחש
        // args.target = הרכיב שהעלה את הארוע שהתרחש
        // args.target.value = של הרכיב שהעלה את הארוע value-ערך ה
        const imageWidth = +args.target.value;
        this.setState({ imageWidth });
    }

    private isWinter(): boolean {
        const date = new Date();
        const month = date.getMonth() + 1;
        return month >= 11 || month <= 3;
    }

    private changeColor = (args: ChangeEvent<HTMLInputElement>) => {
        const color = args.target.value;
        this.setState({ color });
    }

    private displayRegion = (args: ChangeEvent<HTMLSelectElement>) => {
        const region = args.target.value;
        alert(region);
    }

    private showDimensions = () => {
        alert(this.homeImage.width + " x " + this.homeImage.height);
    }

    public render() {
        return (
            <div className="home">

                <Heading>Best Products Website Ever!</Heading>

                {/* Interpolation: */}
                <h3 style={{ color: this.state.color }}>Only on {this.getMonth()} - {this.state.currentDiscount}% discount on all products!</h3>

                {/* Property Binding: */}
                <img ref={domObject => this.homeImage = domObject} onClick={this.showDimensions} src="/assets/images/home.png" width={this.state.imageWidth} alt="Home" />

                <div className="topRight">

                    <Clock />

                    <button onClick={this.showDimensions}>Show Image Dimensions</button>
                    <br />

                    <select onChange={this.displayRegion}>
                        {this.state.regions.map(r =>
                            <option value={r} key={r}>{r}</option>
                        )}
                    </select>
                    <br />

                    <input type="text" placeholder="Enter Color..."
                        value={this.state.color}
                        onChange={this.changeColor} />
                    <br />

                    {/* Event Binding: */}
                    <button onClick={this.decreaseImage}>&darr;</button>
                    <button onClick={this.resetImage}>&harr;</button>
                    <button onClick={this.increaseImage}>&uarr;</button>
                    <br />

                    {/* Two-Way Binding: */}
                    <input type="range" min="100" max="500"
                        value={this.state.imageWidth}
                        onChange={this.changeImageWidth} />

                    <hr />

                    <p>Apples</p>
                    <p>Bananas</p>

                    {/* Conditional Rendering using && --> תפוזים יש רק בחורף */}
                    {this.isWinter() && <p>Oranges</p>}

                    {/* Conditional Rendering using || --> מנגו אין בחורף */}
                    {this.isWinter() || <p>Mango</p>}

                    {/* Display Collection: */}
                    {this.state.vegetables.map((v, index) => <p key={index}>{v}</p>)}

                </div>

            </div>
        );
    }
}