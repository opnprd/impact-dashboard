import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import burger from './images/burger.svg';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleMenu() {
    this.setState(() => ({ open: !this.state.open }));
  }

  closeMenu() {
    this.setState(() => ({ open: false }));
  }

  render() {
    const toggle = (e) => this.toggleMenu();
    const close = (e) => this.closeMenu();

    return <nav className='menu'>
      <label className='button' htmlFor="show-menu" onClick={ toggle }>
        <img src={burger} />
      </label>
      <input type="checkbox" id="show-menu" checked={ this.state.open }/>
      <ul>
        <li><NavLink exact={true} to="/" onClick={ close }>Dashboard</NavLink></li>
        <li><NavLink to="/validator" onClick={ close }>Report Syndication</NavLink></li>
      </ul>
    </nav>;
  }
}
