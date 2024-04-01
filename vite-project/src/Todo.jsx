
import React from "../core/React.js";

export function Todo (){
    const init = [{
        title:'喝水'
    },{
        title:'吃饭'
    },{
        title:'睡觉'
    }];
    let [list, setList] = React.useState(init);
    let [inputValue, setInputValue] = React.useState('')
    function handleClick(){
        setList((l)=>[...l,{title:inputValue}])
        setInputValue('')
    }
    return (<div>
                <h1>Todos</h1>
                <div>
                    <input type="text" value={inputValue} onChange={(e)=>{
                        console.log('onchange', e.target.value)
                        setInputValue(e.target.value)
                    }}/>
                    <button onClick={handleClick}>+</button>
                    <ul>
                        {...list.map(i=>{
                            return (<li>{i.title}</li>)
                        })}
                    </ul>

                </div>
            </div>)
}



