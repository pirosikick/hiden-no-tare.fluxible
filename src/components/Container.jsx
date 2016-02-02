import React from 'react';
import {Link} from 'react-router';

const Container = props => (
  <div>
    <h1>HIDEN NO TARE</h1>
    <ul>
      <li><Link to="/one">one</Link></li>
      <li><Link to="/two">two</Link></li>
    </ul>
    {props.children}
  </div>
);

export default Container;
