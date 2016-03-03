import React from "react";
import ReactDOM from "react-dom";

class Hello extends React.component {
    render() {
        return <h1>Hello</h1>;
    }
}

ReactDOM.render(<Hello />, document.getElementById("container"));