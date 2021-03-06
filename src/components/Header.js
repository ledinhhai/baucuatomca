import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src="/baucuatomca/img/icon.jfif"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/room">Phòng chơi</Link>
              <a href="/" className="nav-item nav-link mr-3" onClick={() => auth().signOut()}>Đăng xuất</a>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/login">Đăng nhập</Link>
              <Link className="nav-item nav-link mr-3" to="/signup">Đăng ký</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;