import React from "react";
import ReactDOM from "react-dom";

import stylesheet from "./sass/main.scss";

import DrawingCanvas from "./components/canvas.jsx";

ReactDOM.render(<DrawingCanvas width={400} />, document.getElementById("container"));