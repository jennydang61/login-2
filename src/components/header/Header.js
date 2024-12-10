import './Header.css';
import { useNavigate } from 'react-router-dom'; 
import React from 'react';

function Header() {
  const navigate = useNavigate(); 
    return (
      <header className="header">
        {/* home not done yet */}
        <h1 className="logo" href="/" onClick={() => navigate('/Home')}>LOGO</h1>
        <nav className="nav">
          <a href="/requests" className="nav-link">Requests</a>
          <a href="/messages" className="nav-link">Messages</a>
          <a href="/account" className="nav-link">Account</a>
        </nav>
      </header>
    );
  }
  
  export default Header;