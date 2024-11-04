import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigateTo } from '../../../services/designFunctions';

function NavBar(){
  const navigate = useNavigateTo();

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
              <li className="nav-link"  onClick={() => navigate('/changePref')}>Präferenzen bearbeiten</li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }

  export default NavBar;