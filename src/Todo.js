import React,{usestate} from 'react'
import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Todo.css'
import db from './Firebase'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [input,setInput] = React.useState('')



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const updateTodo = () =>{
    db.collection('todos').doc(props.todo.id).set({
      todo:input
    },{merge:true})
    //Merge true prevent to overwrite to default todo
    setOpen(false)
  }
    return (
        <div className="app">
        <center> 
        <> 
         <Modal
        open={open}
        onClose={handleClose}
      
      >
      <div className={classes.paper}>
      
      <h1>Update Todo Here..</h1>

      <input placeholder={props.todo.todo}  value={input} onChange={ event => setInput(event.target.value)}/>
      <button onClick={ updateTodo }>UpDate</button>
      </div>
     
      </Modal>    
      </>
          <List>
  <ListItem>
    <ListItemAvatar>
   
    </ListItemAvatar>
    <ListItemText id="text" primary="Todo:" secondary={props.todo.todo} />
  </ListItem>
  <DeleteIcon id="icon" onClick={event => db.collection('todos').doc(props.todo.id).delete()}></DeleteIcon>
  <EditIcon onClick={e => setOpen(true)}>Edit</EditIcon>


</List>
</center>

       
        </div>
    )
}

export default Todo
