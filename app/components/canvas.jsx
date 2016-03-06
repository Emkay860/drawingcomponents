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
        this.onResize = this.onResize.bind(this);
        this.getMouseOnCanvas = this.getMouseOnCanvas.bind(this);
        
        this.state = {
            dragging: false,
            ctx: null,
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
    
    getMouseOnCanvas(e) {
        var x = e.clientX - this.state.canvas.offsetLeft;
        var y = e.clientY - this.state.canvas.offsetTop;
        return { x: x, y: y };
    }
    
    onMouseUp(e) {        
        var mousePos = this.getMouseOnCanvas(e);
        this.state.dragging = false;
        this.state.ctx.lineTo(mousePos.x, mousePos.y);
        this.state.ctx.closePath();
        this.state.ctx.stroke();
    } 
    
    onMouseDown(e) {
        var mousePos = this.getMouseOnCanvas(e);
        this.state.dragging = true;
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(mousePos.x, mousePos.y);
    }
    
    onMouseMove(e) {
        var mousePos = this.getMouseOnCanvas(e);
        if (this.state.dragging) {
            console.log(mousePos.x + " " + mousePos.y); 
        }
    }
    
    onResize(e) {
        console.log(
            this.state.canvas.width
        );
    }
    
    componentDidMount() {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = canvas.getContext("2d");
        this.state = {
            dragging: false,
            ctx: ctx,
            canvas: canvas,
        }
        
        canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
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