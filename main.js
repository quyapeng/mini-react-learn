console.log("main.js");

// s1
// const dom = document.createElement("div");
// dom.id = "app";
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = "app";
// dom.append(textNode);

/// s2 动态创建 vdom
// react -> vdom ==> js 对象{}
// type props children
// const textEl = {
//   type: "TEXT_ELEMENT",
//   props: {
//     nodeValue: "app",
//     children: [],
//   },
// };

// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: [textEl],
//   },
// };

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children,
//     },
//   };
// }

// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, textEl);

// const dom = document.createElement(App.type);
// dom.id = App.props.id;
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

// s3 动态创建节点
// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map((child) => {
//         return typeof child === "string" ? createTextNode(child) : child;
//       }),
//     },
//   };
// }

// // const dom = document.createElement(App.type);
// // dom.id = App.props.id;
// // document.querySelector("#root").append(dom);

// // const textNode = document.createTextNode("");
// // textNode.nodeValue = textEl.props.nodeValue;
// // dom.append(textNode);

// function render(el, container) {
//   // 1.创建el
//   const dom =
//     el.type === "TEXT_ELEMENT"
//       ? document.createTextNode("")
//       : document.createElement(el.type);
//   // 2.设置props
//   Object.keys(el.props).forEach((key) => {
//     // 只处理非children的props
//     if (key !== "children") {
//       dom[key] = el.props[key];
//     }
//   });
//   // 3.append
//   const children = el.props.children;
//   children.forEach((child) => {
//     render(child, dom);
//   });
//   container.append(dom);
// }
// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, textEl);
// const App = createElement("div", { id: "app" }, "app");
// console.log(App);
// render(App, document.querySelector("#root"));

// const ReactDom = {
//   createRoot(container) {
//     return {
//       render(App) {
//         render(App, container);
//       },
//     };
//   },
// };

import ReactDom from "./core/ReactDom.js";
import App from "./App.jsx";
// console.log(App);

ReactDom.createRoot(document.querySelector("#root")).render(App);
