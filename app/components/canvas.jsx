import React from "react";
import ReactDOM from "react-dom";

import CanvasMenu from "./canvasMenu.jsx";

class DrawingCanvas extends React.Component {
    
    constructor() {
        super();
        
        // this makes sure that when canvas calls these function, 
        // "this" will refer to the DrawingCanvas and not the actual
        // HTML canvas element.
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onResize = this.onResize.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._getMouseOnCanvas = this._getMouseOnCanvas.bind(this);
        this._getCanvasScaleFactor = this._getCanvasScaleFactor.bind(this);
        
        this.state = {
            dragging: false,
            ctx: null,
            canvas: null,
            scale: {
                x: 1,
                y: 1
            }
        };
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
    
    _exportCanvas(canvas) {
        var image = canvas.toDataURL("image/png");
        this.props.socket.emit("SendImage", {
            img: image
        });
    }
    
    onMouseUp(e) {        
        var mousePos = this._getMouseOnCanvas(e);
        this.setState({
            dragging: false
        });
        this.state.ctx.lineTo(mousePos.x, mousePos.y);
        this.state.ctx.stroke();
    } 
    
    onMouseDown(e) {
        var mousePos = this._getMouseOnCanvas(e);
        this.setState({
            dragging: true
        });
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
    
    onResize() {
        var scale = this._getCanvasScaleFactor(this.state.canvas);
        this.setState({
            scale: {
                x: scale.x,
                y: scale.y
            }
        });
    }
    
    handleClick() {
        var canvas = this.state.canvas;
        
        /* eslint no-console: 0 */
        console.log("click");
        this._exportCanvas(canvas);
    }
    
    componentDidMount() {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = canvas.getContext("2d");
        
        // apply any initial canvas scale factors
        var scale = this._getCanvasScaleFactor(canvas);
        
        /* eslint react/no-did-mount-set-state: 0 */
        this.setState({
            canvas: canvas,
            ctx: ctx,
            scale: {
                x: scale.x,
                y: scale.y
            }
        });
        
        canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
    }
    
    render() {
        return (
            <div className="DrawingCanvas card">
                <canvas 
                    className="DrawingCanvas_canvas" 
                    width={this.props.width}
                    height={this.props.height}
                    brushColor={this.props.brushColor}
                    ref="canvas">
                </canvas>
                <CanvasMenu onClick={this.handleClick}/>
            </div>
        );
    }
}

DrawingCanvas.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    brushColor: React.PropTypes.string,
    socket: React.PropTypes.object
};

export default DrawingCanvas;