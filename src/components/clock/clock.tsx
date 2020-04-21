import React, { Component } from "react";
import "./clock.css";

interface ClockState {
    time: string;
}

export class Clock extends Component<any, ClockState> {

    private timer;

    public constructor(props: any) {
        super(props);
        this.state = {
            time: this.getCurrentTime()
        };
    }

    public getCurrentTime(): string {
        const date = new Date();
        const time = date.toLocaleTimeString();
        return time;
    }

    public componentDidMount(): void {
        this.timer = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    public render() {
        return (
            <div className="clock">
                <h5>{this.state.time}</h5>
            </div>
        );
    }
}