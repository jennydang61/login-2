import './Header.css';
import { useNavigate, Link} from 'react-router-dom';
import React from 'react';

function Header() {
  const navigate = useNavigate(); 
    return (
      <header className="header">
        {/* home not done yet */}
        <h1 className="logo" href="/" onClick={() => navigate('/Home')}>LOGO</h1>
        <nav className="nav">
          <Link className='nav-link' to="/requests">Requests</Link>
          <Link className='nav-link' to="/messages">Messages</Link>
          <Link className='nav-link' to="/account">Account</Link>
        </nav>
      </header>
    );
  }
  
  export default Header;