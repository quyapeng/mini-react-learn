import React from "./core/React.js";

function Counter({num}){
    return <div>count: {num}</div>
}
function CounterContainer(){
    return <Counter num={10}>count</Counter>
}

function App (){
    return <div>hi,mini-react<Counter num={10}>count</Counter><Counter num={20}>count</Counter></div>
}

// const App = <div>hi,mini-react<CounterContainer></CounterContainer>
// </div>;

export default App;
