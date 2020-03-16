import React, { Component } from "react";
import tick from "./tick.svg";
import "./App.css";

function Entry(props) {
  return (
    <div className="entry">
      {props.task}
      <Tick index={props.index} click={props.delete} />
    </div>
  );
}

function Tick(props) {
  return (
    <img
      className="tick"
      src={tick}
      alt=""
      onClick={() => props.click(props.index)}
    />
  );
}

// shitty class for a stupid textinput component which i cant autofocus
// class EditEntry extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: '',visible:false};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('Le nom a été soumis : ' + this.state.value);
//     event.preventDefault();
//     this.props.SendEntry(this.state.value);
//     this.setState({value:''})

//   }

//   render () {
//     return (
//         <input id="edit" className={`entry ${this.state.visible ? '': 'suppressed'}`} value={this.state.value} onChange={this.handleChange} />
//       )
//   }
// }

function NewEntry(props) {
  return (
    // <div className="entry new-entry" onClick={() => props.addtask(props.task)}>Add new entry...</div>
    <div className="entry new-entry" onClick={() => props.addtask()}>
      Add new entry...
    </div>
  );
}

class Todo extends Component {
  constructor(props) {
    super(props);

    // Get cookie data as Array form
    // tester si marche sans    const decodedCookie = decodeURIComponent(document.cookie);
    // the 4 lines of code which follow are not useful
    // const machine = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    // const testcookie=/name=(.+);\sexpires/;
    // const parseddata = testcookie.exec(machine);
    // console.log(parsedata);
    const d = new Date();
    d.setTime(d.getTime() + (360*24*60*60*1000));
    const expire = ";expires="+ d.toUTCString() + ";path=/";

    if (document.cookie) {
    const cookiedata = document.cookie.replace(/(?:(?:^|.*;\s*)todo\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const fetcheddata = JSON.parse(cookiedata)
    this.state = { entries:fetcheddata,edit:false,text:"",expire:expire}

    } else {

    this.state = {
      entries: ["do dishes", "do chores", "watch TV"],
      edit: false,
      text: "",
      expire:expire};
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterkey = this.handleEnterkey.bind(this);
    this.textInput = React.createRef();
  }

  EditOn = e => {
    this.setState({ edit: true });
  };

  EditOff = e => {
    this.setState({ edit: false });
  };

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  Taskadd = task => {
    const temp = this.state.entries;
    temp.push(task);
    console.log("testtaskadd", this.state.entries);
    this.setState({ text: "", entries: temp, edit: false });
  };

  handleEnterkey(e) {
    if (e.key === "Enter") this.Taskadd(this.state.text);
  }

  Finish = key => {
    // console.log("test index",key)
    const temp = this.state.entries;
    temp.splice(key, 1);
    // console.log("test index 2",temp)
    this.setState({ entries: temp });
  };

  componentDidUpdate() {
    // Data is sent to cookies
    const datasent = JSON.stringify(this.state.entries);
    document.cookie = "todo=" + datasent + this.state.expire;


    this.textInput.current.focus();
  }

  render() {
    // const liste = this.state.entries;
    return (
      <div className="todo-box">
        {this.state.entries.map((task, index) => (
          <Entry
            key={index}
            index={index}
            task={`${task}`}
            delete={this.Finish}
          />
        ))}
        <input
          ref={this.textInput}
          id="edit"
          className={`entry ${this.state.edit ? "" : "suppressed"}`}
          value={this.state.text}
          onChange={this.handleChange}
          onKeyPress={this.handleEnterkey}
        />
        {/* <EditEntry visible={this.state.edit} SendEntry={this.Taskadd} /> */}
        <NewEntry addtask={this.EditOn} />
        {/* <NewEntry task="frequent" addtask={this.Taskadd}/> */}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Todo />
      <div className="credit">Made by <a rel="noopener noreferrer" target="_blank" href="https://github.com/kanedaron">Nicolas Bonamour</a></div>
    </div>
  );
}

export default App;
