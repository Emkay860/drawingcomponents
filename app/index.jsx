import React from "react";
import ReactDOM from "react-dom";

import stylesheet from "./sass/main.scss";

import DrawingCanvas from "./components/canvas.jsx";

ReactDOM.render(<DrawingCanvas width={550} height={550}/>, document.getElementById("container"));