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
        this._getMouseOnCanvas = this._getMouseOnCanvas.bind(this);
        this._getCanvasScaleFactor = this._getCanvasScaleFactor.bind(this);
        
        this.state = {
            dragging: false,
            ctx: null,
            canvas: null,
            scale: {
                x: 1,
                y: 1,
            }
        }
    }
    
    updateMouseCoords() {
        this.state = {
            mouse: {
                x: mouse[0],
                y: mouse[1]
            }
        }
    }
    
    _getMouseOnCanvas(e) {
        var rect = this.state.canvas.getBoundingClientRect();
        var x = (e.clientX - rect.left) / this.state.scale.x;
        var y = (e.clientY - rect.top) / this.state.scale.y;
        return { x: x, y: y };
    }
    
    _getCanvasScaleFactor(canvas) {
        var rect = canvas.getBoundingClientRect();
        var x = rect.width / canvas.width;
        var y = rect.height / canvas.height;
        return { x: x, y: y };
    }
    
    onMouseUp(e) {        
        var mousePos = this._getMouseOnCanvas(e);
        this.state.dragging = false;
        this.state.ctx.lineTo(mousePos.x, mousePos.y);
        this.state.ctx.stroke();
    } 
    
    onMouseDown(e) {
        var mousePos = this._getMouseOnCanvas(e);
        this.state.dragging = true;
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(mousePos.x, mousePos.y);
    }
    
    onMouseMove(e) {
        var mousePos = this._getMouseOnCanvas(e);
        if (this.state.dragging) {
            this.state.ctx.stroke();
            this.state.ctx.lineTo(mousePos.x, mousePos.y);
        }
    }
    
    onResize(e) {
        var scale = this._getCanvasScaleFactor(this.state.canvas);
        this.state.scale.x = scale.x;
        this.state.scale.y = scale.y;
    }
    
    componentDidMount() {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = canvas.getContext("2d");
        this.state.canvas = canvas;
        this.state.ctx = ctx;
        
        console.log(this.state.canvas);
        
        // apply any initial canvas scale factors
        var scale = this._getCanvasScaleFactor(this.state.canvas);
        this.state.scale.x = scale.x;
        this.state.scale.y = scale.y;
        
        canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
    }
    
    render() {
        return (
            <canvas 
                className="DrawingCanvas_canvas card" 
                width={this.props.width}
                height={this.props.height}
                brushColor="#000000"
                ref="canvas">
            </canvas>
        );
    }
}

export default DrawingCanvas;