import ReactDom from "./core/ReactDom.js";
import React from './core/React.js';
import App from "./App.jsx";
import './style.css'
// console.log(App);

ReactDom.createRoot(document.querySelector("#root")).render(<App></App>);
