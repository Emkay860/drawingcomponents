import React from "react";

class DrawingCanvas extends React.Component {
    render() {
        return (
            <div className="DrawingCanvas card">
                <canvas width="450" height="450px">
                </canvas>
                <div className="card-action">
                </div>
            </div>
        );
    }
}

export default DrawingCanvas;