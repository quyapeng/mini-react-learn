import React from "./core/React.js";
import {Todo} from "./src/Todo.jsx";
// let count = 1;
// const props = {id:"test"}
// function Counter({num}){
// function handleClick (){
//     console.log('click')
//     count++
//     React.update()
// }
//     return (<div {...props}>count: {count}<button onClick={handleClick}>click</button></div>)
// }
// let tagBar = false;
// function Counter(){
//     const foo = <div>foo<div>child</div><div>child</div><div>child</div></div>;
//     // function Foo (){
//     //     // return <div>foo</div>
//     //     return (<div>
//     //         foo
//     //         <div>child</div>
//     //     </div>)
//     // }
//     const bar = <p>bar</p>;
//     function handleTabBar (){
//         tagBar = !tagBar;
//         React.update()
//     }
//         return (<div>Counter{tagBar&&bar}
//            <button onClick={handleTabBar}>click</button></div>)
//     }
// function CounterContainer(){
//     return <Counter num={10}>count</Counter>
// }

// let countFoo = 1;
// function Foo(){
//     const [count, setCount] = React.useState(10)
//     const [bar, setBar] = React.useState('bar')

//     React.useEffect(()=>{
//         console.log('useEffect init');
//         return ()=>{
//             console.log('cleanup 0');
//         }
//     },[])
    
//     React.useEffect(()=>{
//         console.log('update count');
//         return ()=>{
//             console.log('cleanup 0');
//         }
//     },[count])

//     React.useEffect(()=>{
//         console.log('update count2');
//         return ()=>{
//             console.log('cleanup 2');
//         }
//     },[count])
//     // const update = React.update();
//     function handleClick(){
//         // countFoo++;
//         // update()
//         setCount((c)=>c+1)
//         // setBar((s)=> s+'123')
//         setBar('bar')
//     }
//     return (
//         <div>
//             <h1>foo</h1>
//             <h1>{count}</h1>
//             <h1>{bar}</h1>
//             <button onClick={handleClick}>click</button>
//         </div>
//     )
// }



// let countBar = 1;
// function Bar(){
//     const update = React.update();
//     function handleClick(){
//         countBar++;
//         update()
//     }
//     return (
//         <div>
//             <h1>bar</h1>
//             {countBar}
//             <button onClick={handleClick}>click</button>
//         </div>
//     )
// }

// let countRoot = 1;
// function App (){
//     const update = React.update();
//     function handleClick(){
//         countRoot++;
//         update()
//     }
//     return (<div>hi,mini-react,countRoot:{countRoot}
//         {/* <button onClick={handleClick}>click</button> */}
//         <Foo />
//         {/* <Bar /> */}
//     </div>)
// }

// const App = <div>hi,mini-react<CounterContainer></CounterContainer>
// </div>;
function App (){

    return (<div>
App
<Todo />
    </div>)
}

export default App;
