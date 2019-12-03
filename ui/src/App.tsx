import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
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
            <input type="submit" value="Generate!" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
