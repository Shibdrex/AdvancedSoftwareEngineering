import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavBar(){

  const navigate = useNavigate();

  const handleNavigation = () => {
  navigate('/changePref'); // Hier die Route angeben, zu der du navigieren möchtest
  };


    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand" style={{color: '#a64ac9'}}>Isabella</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <li className="nav-link" onClick={handleNavigation}>Präferenzen bearbeiten</li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }

  export default NavBar;