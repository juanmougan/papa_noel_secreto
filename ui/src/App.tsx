import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // TODO add types
  constructor(props: any) {
    super(props);
    this.state = {
      newItem: '',
      list: []
    };
  }

  // TODO add types
  updateInput(key: any, value: any) {
    // update react state
    this.setState({ [key]: value });
  }

  // TODO add types
  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ''
    });
  }

  // TODO add types
  deleteItem(id: any) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Pap&aacute; Noel secreto!</h1>
          <p>
            <small className="catch-phrase">
              Same old <span className="italics-name">Secret Santa</span>, but
              Latinamericanized!
            </small>
          </p>
        </header>
        <div className="form-container">
          <form>
            <div className="form-row">
              <input
                type="text"
                name="gifter"
                className="gifter-input"
                placeholder="Add people to the roster"
                // TODO save value
                //value={this.state.newItem}
                //onChange={e => this.updateInput('newItem', e.target.value)}
              />
              <button className="gifter-add-btn">+</button>
            </div>
            <div className="form-row">
              <textarea
                disabled
                className="roster-preview"
                placeholder="People currently in the roster"
              />
            </div>
            <div className="form-row">
              <input type="submit" className="submit-btn" value="Generate!" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
