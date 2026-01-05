import React from "react";
import logo from "../images/logo.png"

const Header = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg fixed-top shadow-sm" style={{backgroundColor:"#ffffff"}}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-text-top mx-4"
            />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end mx-4" id="navbarScroll">
            <ul class="navbar-nav" style={{ "--bs-scroll-height": "900px" }}>
              <li class="nav-item">
                <a class="nav-link fw-bold" href="#">User Guide</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link fw-bold" href="#">About</a>
              </li>
            </ul>      
          </div>
        </div>
      </nav>




    </>
  );
};

export default Header;
