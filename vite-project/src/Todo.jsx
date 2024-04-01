
import React from "../core/React.js";

export function Todo (){
    const init = [{
        title:'喝水',
        id: crypto.randomUUID(),
        status: 'active'
        // id:1
    },{
        title:'吃饭',
        id: crypto.randomUUID(),
        status: 'done'
        // id:2
    },{
        title:'睡觉',
        id: crypto.randomUUID(),
        status: 'done'
        // id:3
    }];
    let [list, setList] = React.useState([]);
    let [inputValue, setInputValue] = React.useState('');
    let [filter, setFilter] = React.useState('all');
    let [filterList, setFilterList] = React.useState([]);

    function add(title){
        setList((l)=>[...l,{title, id: crypto.randomUUID(), status:'active'}])
    }
    function handleClick(){
        add(inputValue);
        setInputValue('');
    }

    function remove (id){
        console.log('id', id)
        const newList = list.filter((i)=>{
            return id!=i.id
        });
        setList(newList)
    }
    function handleListStatus(id, status){
        // id
        const newList = list.map((i)=>{
            if(i.id == id){
                return {...i, status:status=='done'?'active':'done'}
            }
            return i;
        });
        console.log('newList', newList)
        setList(newList)
    }
    // function cancelDone (id){
    //     const newList = list.map((i)=>{
    //         if(i.id == id){
    //             return {...i, status:'active'}
    //         }
    //         return i;
    //     });
    //     console.log('newList', newList)
    //     setList(newList)
    // }
    function saveList(){
        // 
        localStorage.setItem('list', JSON.stringify(list))
    }

    React.useEffect(()=>{
        //
        const local = localStorage.getItem('list');
        if(local){
            setList(JSON.parse(local))
        }
    },[]);

    React.useEffect(()=>{
        //
        if(filter == 'all'){
            setFilterList(list)
        }else if(filter == 'active'){
            const newList = list.filter(i=>{
                return i.status == 'active'
            });
            setFilterList(newList)
        }else if(filter == 'done'){
            const newList = list.filter(i=>{
                return i.status == 'done'
            });
            setFilterList(newList)
        }
    },[filter, list]);
    return (<div>
                <h1>Todos</h1>
                <button onClick={saveList}>save</button>
                <div>
                    <input type="radio" name="filter" id="all" 
                    checked={filter === 'all'} onChange={()=>setFilter('all')}/>
                    <label htmlFor="all">all</label>
                    <input type="radio" name="filter" id="active" 
                    checked={filter === 'active'} onChange={()=>setFilter('active')}/>
                    <label htmlFor="active">active</label>
                    <input type="radio" name="filter" id="done" 
                    checked={filter === 'done'} onChange={()=>setFilter('done')}/>
                    <label htmlFor="done">done</label>
                </div>
                <div>
                    <input type="text" value={inputValue} onChange={(e)=>{
                        console.log('onchange', e.target.value)
                        setInputValue(e.target.value)
                    }}/>
                    <button onClick={handleClick}>+</button>
                    <ul>
                        {...filterList.map(i=>{
                            return (<li className={i.status}>
                                {/* {i.title}
                                    <button onClick={()=>remove(i.id)}>-</button>
                                    {<button onClick={()=>handleListStatus(i.id, i.status)}>{i.status == 'active'?'✓':'x'}</button>} */}
                                <Item item={i} remove={remove} handleListStatus={handleListStatus}/>
                                </li>)
                        })}
                    </ul>

                </div>
            </div>)
}



function Item({item, remove,handleListStatus }){
    return (
        <div className={item.status}>
            {item.title}
            <button onClick={()=>remove(item.id)}>-</button>
            {<button onClick={()=>handleListStatus(item.id, item.status)}>{item.status == 'active'?'✓':'x'}</button>}
                                
        </div>
    )
}