import React, { Component } from "react";
import "./thumbnail.css";

interface ThumbnailProps {
    imageWidth: number;
    imageHeight: number;
    imageSource: string;
    userEntersMe?(imageSource: string): void; // ? = Optional Parameter
    userLeftMe?(): void;
}

export class Thumbnail extends Component<ThumbnailProps> {

    public constructor(props: ThumbnailProps) {
        super(props);
    }

    private mouseEnter = () => {
        if(this.props.userEntersMe) {
            this.props.userEntersMe(this.props.imageSource);
        }
    }

    private mouseLeave = () => {
        if(this.props.userLeftMe) {
            this.props.userLeftMe();
        }
    }

    public render() {
        return (
            <div className="thumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>

                <img width={this.props.imageWidth}
                    height={this.props.imageHeight}
                    src={this.props.imageSource}
                    alt="" />

            </div>
        );
    }
}