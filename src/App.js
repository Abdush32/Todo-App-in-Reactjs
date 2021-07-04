import React,{useState,useEffect} from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import './App.css'
import Todo from './Todo'
import db from './Firebase'
import firebase from 'firebase'
import SendIcon from '@material-ui/icons/Send';


const App = () => {
  const [todos,setTodos] = useState([])
  const [input, setInput] = useState('')

  // when App loads we need to listen the database to fetch as they get added/removed
  useEffect(() => {
  //this code fire when App.js load
  //we use orderby bcz to get the most recent one text..
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
    // console.log((snapshot.docs.map(doc => doc.data().todo)))
    setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
  })
  }, [])


  const addTodo = (event) =>{
    event.preventDefault(); //It will stop the refresh
    db.collection('todos').add({
      todo:input,
      //WE use timestamp to get server time otherwise time is gunna missmatch
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input])
    setInput('')  // it will set to blank input
  }

  return (
    <div className="App">
    <h1>TODO-APP</h1>
    <form>
 
    <FormControl>
   
  <InputLabel>Write Something....</InputLabel>
  <Input   value={input} onChange={ event => setInput(event.target.value)}  />

</FormControl>
<SendIcon type="submit" onClick={addTodo} variant="contained" color="secondary" disabled={!input}/>

    </form>
    <ul>
    
    {todos.map( todo => (
     <Todo todo={todo}/>
    ))}
 
   
    </ul>
      
    </div>
  )
}

export default App
