import React from 'react';
import { Roster } from './roster';

type FormProps = {
    // TODO
}

export const Form = ({}: FormProps) => <form>
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
<Roster />
<div className="form-row">
  <input type="submit" className="submit-btn" value="Generate!" />
</div>
</form>
