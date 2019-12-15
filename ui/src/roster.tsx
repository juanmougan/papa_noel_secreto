import React from 'react';
import { RosterItem } from './roster-item';

type RosterProps = {
    // TODO
}

export const Roster = ({}: RosterProps) => <div className="roster-container">
<h6>People currently in the roster</h6>
<ul>
  <RosterItem />
</ul>
</div>
