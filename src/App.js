import { useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [itemList, setItemList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [editValue, setEditValue] = useState("");


  function addItem() {
    var newItemList = JSON.parse(JSON.stringify(itemList))
    var pushItem = {
      id : counter,
      value : newItem,
      edit : false
    }
    setCounter(counter+1)
    newItemList.push(pushItem)
    setItemList(newItemList)
  }
  function deleteItem(idToDelete) {
    var newItemList = []
    for (const key in itemList) {
      if (itemList[key].id !== idToDelete) {
        newItemList.push(itemList[key])
      }
    }
    setItemList(newItemList)
  }

  function editItem(idToEdit) {
    var newItemList = []
    setEditValue("")
    for (const key in itemList) {
      if (itemList[key].id === idToEdit) {
        var tempPush = {id:itemList[key].id, value:itemList[key].value, edit:true}
        newItemList.push(tempPush)
      } else {
        itemList[key].edit = false
        newItemList.push(itemList[key])
      }
    }
    setItemList(newItemList)
  }

  function updateItem(id) {
    var newItemList = []
    for (const key in itemList) {
      if(itemList[key].id === id) {
        var tempPush = {id:itemList[key].id, value:editValue, edit:false}
        newItemList.push(tempPush)
      } else {
        newItemList.push(itemList[key])
      }
    }
    setItemList(newItemList)
  }

  

  return (
    <div className="app">
      <h1>To Do list</h1>
      <input onChange={e => setNewItem(e.target.value)} type="text" placeholder="enter item"></input>
      <button onClick={()=>addItem()}>Add Item</button>
      <ul>
        {
          itemList.map((item)=>{
            if(item.edit) {
              return (
                <>
                  <li key={item.id} onClick={()=>editItem(item.id)}>{item.value}</li>
                  <input placeholder="New Item Name" onChange={(e)=>setEditValue(e.target.value)}></input>
                  <button onClick={()=>updateItem(item.id)}>Update</button>
                </>
              )
            } else {
              return (
                <>
                  <li key={item.id} onClick={()=>editItem(item.id)}>{item.value}</li>
                  <button onClick={()=>deleteItem(item.id)}>Complete</button>
                </>
              )
            }
            
          })
        }
      </ul>
    </div>
  );
}
