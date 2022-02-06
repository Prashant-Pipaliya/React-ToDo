import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const App = () => {

  const [data, setData] = useState("");  // fetch input value
  const [store, setStore] = useState([]);
  const [line, setLine] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);

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
      const inputData = { id : Math.random() * 10000000000, name : data } // unique id
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

  const checkValue = (index) => {
    setLine(true);
  }

  // edit item

  const editItem = (index) => {
    setData(store.find((val) => val.id === index).name);
    setToggle(false);
    setEdit(index);
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
      
          </div>

          <ul className="todo_list list-group mt-4">
            {
              store.map((value) => {
                return(
                  <li style={{textDecoration : line ? "line-through" : "none" }} className="list-group-item" key={value.id} >{value.name}
                    <DeleteOutlineIcon className='deleteButton' onClick={() => deleteItem(value.id)} />
                    <EditIcon className='editButton' onClick={() => editItem(value.id)} /> 
                    <CheckIcon className='checkButton' onClick={checkValue} />
                  </li>
                )
              })
            } 
          </ul>

          {/* map  method store each value in list */}

          <center>
            <button type="button" onClick={clearList} className="buttonItem btn btn-light"></button>
          </center>

        </div>

      </div>
    </>
  )
}

export default App;
