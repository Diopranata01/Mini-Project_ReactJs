import { React, useRef } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

const IniNavbar = () => {
  const navBar = useRef();

  const navBarShow = () => {
    navBar.current.classList.toggle("res_nav");
  };

  return (
    <>
      <div className="header">
        <div className="container">
            <div 
            className="btn nav-btn justify-content-center" 
            // style={{ marginLeft: "4vw"}}  
            onClick={navBarShow}>
            <div className="col-md-2">
                <FontAwesomeIcon icon={faBars} className="fa-2xl" />
            </div>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark" ref={navBar}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav row">
                <div className="btn nav-btn nav-close-btn mt-4 col"
                 style={{
                    marginLeft: "10vw",
                  }}
                 onClick={navBarShow}>
                  <FontAwesomeIcon icon={faXmark} className="fa-2xl" />
                </div>
                {/* <FontAwesomeIcon icon={faXmark} onClick={hideMenu()}/> */}
                <li className="nav-item row gap-4">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                  <Link className="nav-link active" to="/about">
                    About Us
                  </Link>
                  <Link className="nav-link active" to="/about">
                    Profile
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                </li> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default IniNavbar;
