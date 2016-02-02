import {NavLink} from 'fluxible-router';

const Nav = () => (
  <ul>
    <li>
      <NavLink routeName="home" activeStyle={{backgroundColor: '#ccc'}}>Home</NavLink>
    </li>
    <li>
      <NavLink routeName="about" activeStyle={{backgroundColor: '#ccc'}}>About</NavLink>
    </li>
  </ul>
);

export default Nav;
