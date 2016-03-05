import React from "react";
import ReactDOM from "react-dom";
//import mousePosition from "mouse-position";
import CanvasLogic from "../js/CanvasLogic.js";

class DrawingCanvas extends React.Component {
    
    constructor(props) {
        super();
        
        // this makes sure that when canvas calls these function, 
        // "this" will refer to the DrawingCanvas and not the actual
        // HTML canvas element.
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        
        this.state = {
            dragging: false,
            mouse: {
                x: 0,
                y: 0,
            }
        }
    }
    
    printMouseCoords() {
        console.log(this.state.mouse.x + " " + this.state.mouse.y);
    }
    
    updateMouseCoords() {
        this.state = {
            mouse: {
                x: mouse[0],
                y: mouse[1]
            }
        }
    }
    
    onMouseUp(e) {
        this.state.dragging = false;    
    } 
    
    onMouseDown(e) {
        this.state.dragging = true;
    }
    
    onMouseMove(e) {
        if (this.state.dragging) {
            console.log(e.clientX + " " + e.clientY); 
        }
    }
    
    componentDidMount() {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = canvas.getContext("2d");
        
        canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mousemove", this.onMouseMove);
    }
    
    render() {
        return (
            <canvas 
                className="DrawingCanvas_canvas card" 
                width="550"
                height="550"
                brushColor="#000000"
                ref="canvas">
            </canvas>
        );
    }
}

export default DrawingCanvas;