import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const App = () => {

  const [data, setData] = useState("");  // fetch input value
  const [store, setStore] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);
  const [done, setDone] = useState("all");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    filterFunction();
  },[store, done]) 

  // add item

  const addItemBtn = () => {

    if(!data){
      alert("plz fill the data");
    }

    else if(!toggle){
      setStore(
        store.map((val) => {
          if(val.id === edit){
            return{ ...val, name: data }
          }
          return val
        })
      )
      setToggle(true);
      setData("");
      setEdit(null);
    }

    else{
      const inputData = { id : Math.random() * 10000000000, name : data, completed: false } // unique id
      console.log(inputData.id); 
      console.log(inputData.name);
      setStore([...store, inputData])  // take all value and store one by one in array
      setData("");
    }

  }

  // delete item

  const deleteItem = (index) => {
    console.log(index);
    setStore(store.filter((val) => val.id !== index ))
    console.log(`value delted from ${index}th position`);
  }

  // clear list

  const clearList = () => {
    setStore([]);
  }

  // check item

  const checkValue = (value) => {
    setStore(store.map((val) => {
      if(val.id === value.id){
        return { ...val, completed: !val.completed }
      }
      return val;
    }))
  }

  // edit item

  const editItem = (index) => {
    setData(store.find((val) => val.id === index).name);
    setToggle(false);
    setEdit(index);
  }

  const selectButton = (e) => {
    setDone(e.target.value);
  }

  // filter item

  const filterFunction = () => {
    switch (done) {
      case 'completed':
        setFilterData(store.filter((value) => value.completed === true ))
        break;
      case 'uncompleted':
        setFilterData(store.filter((value) => value.completed === false ))
        break;  
    
      default:
        setFilterData(store);
        break;
    }
  }

  return (
    <>
      <div className='todo_main' >
        <h3 className='text-center text-light' >Add your item... </h3>

        <div className='todo_content mt-5'>
          <div className="form-group">

            <input type="text" 
              placeholder='Add item' 
              className="form-control"
              value={data}
              onChange={(event) => setData(event.target.value)}
            />

            {
              toggle ? <AddIcon className='addButton'onClick={addItemBtn}/> : <EditIcon className='addButton'onClick={addItemBtn}/>
            }    

            <select className="dropDown" onChange={selectButton} aria-label="Default select example">
              <option selected>All</option>
              <option value="completed" >Completed</option>
              <option value="uncompleted" >Uncompleted</option>
            </select> 

          </div> 

          <ul style={{listStyle:"none"}}  className="todo_list list-group mt-4">
            {
              filterData.map((value) => {
                return(
                  <li className={`list ${ value.completed ? `complete` : ''}`} key={value.id} >{value.name}
                    <DeleteOutlineIcon className='deleteButton' onClick={() => deleteItem(value.id)} />
                    <EditIcon className='editButton' onClick={() => editItem(value.id)} /> 
                    <CheckIcon className='checkButton' onClick={() => checkValue(value)} />
                  </li>
                )
              })
            } 
          </ul>

          {/* map  method store each value in list */}

        </div>

        <center>
            <button type="button" onClick={clearList} className="buttonItem btn btn-light"></button>
        </center>

      </div>
    </>
  )
}

export default App;
