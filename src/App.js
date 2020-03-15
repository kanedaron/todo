import React, { Component } from 'react';
import tick from './tick.svg'
import './App.css';

function Entry(props) {
  return (
    <div className="entry">
      {props.task}
      <Tick index={props.index} click={props.delete} />
    </div>
  )
}

function Tick(props) {
  return (
      <img className="tick" src={tick} alt="" onClick={() => props.click(props.index)} />
  )
}

function EditEntry(props) {
 
  return (
      <input ref="nameInput" id="edit" className={`entry ${props.visible ? '': 'suppressed'}`}/>
    )
}

function NewEntry(props) {
  return (
    // <div className="entry new-entry" onClick={() => props.addtask(props.task)}>Add new entry...</div>
    <div className="entry new-entry" onClick={() => props.addtask()}>Add new entry...</div>
  )
}

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { entries: ["do dishes","do chores","watch TV"],edit:false }
    this.edit = React.createRef();  
  }

EditOn = (e) => {
    this.setState({edit: true}); 
    this.edit.current.focus();
  } 
   
   

EditOff = (e) => {
    this.setState({edit: false});
    }


  Taskadd = (task) => {
    const temp = this.state.entries;
    temp.push(task);
    console.log("testtaskadd",this.state.entries);
    this.setState({entries:temp})
  }

  Finish = (key) => {
    console.log("test index",key)
    const temp = this.state.entries;
    temp.splice(key, 1);
    console.log("test index 2",temp)
    this.setState({entries:temp})
  }
  

  // componentDidUpdate {
  //   // for machine in *state* ecrire un composant *entry* par task
  // }

  render () 
  {
    // const liste = this.state.entries;
    return (
      <div className="todo-box">
          {this.state.entries.map((task,index) => (
          <Entry key={index} index={index} task={`${task}`} delete={this.Finish} />
          ))}
        <EditEntry ref={this.edit} visible={this.state.edit} />
        <NewEntry addtask={this.EditOn} />
        {/* <NewEntry task="frequent" addtask={this.Taskadd}/> */}
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
