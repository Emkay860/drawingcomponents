import React from "react";
import ReactDOM from "react-dom";

/* eslint no-unused-vars: 0 */
import stylesheet from "./sass/main.scss";

import {connectToSocket} from "./js/socketHandler.js";

import DrawingCanvas from "./components/canvas.jsx";

window.addEventListener("load", function() {
    connectToSocket(function(socket) {
        ReactDOM.render(
            <DrawingCanvas socket={socket} width={550} height={550} brushColor={"#000000"}/>, 
            document.getElementById("container")
        );
    });
});