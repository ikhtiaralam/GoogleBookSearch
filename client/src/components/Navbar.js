import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";

const Navbar = props => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to='/' className="navbar-brand">Google Book Search</Link>
      <nav className="d-flex ml-auto">
        <NavLink to='/' className="nav-link" activeClassName="active">Search</NavLink>
        <NavLink to='/saved' className="nav-link" activeClassName="active">Saved</NavLink>
      </nav>
    </div>
  )
}

export default Navbar;
