import React from "./core/React.js";
let count = 1;
const props = {id:"test"}
function Counter({num}){
function handleClick (){
    console.log('click')
    count++
    React.update()
}
    return (<div {...props}>count: {count}<button onClick={handleClick}>click</button></div>)
}
function CounterContainer(){
    return <Counter num={10}>count</Counter>
}

function App (){
    return <div>hi,mini-react<Counter >count</Counter></div>
}

// const App = <div>hi,mini-react<CounterContainer></CounterContainer>
// </div>;

export default App;
