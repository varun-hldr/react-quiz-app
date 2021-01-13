import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../actionsFiles/apiActions";
import "../../css/NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link
            onClick={(e) => this.props.dispatch(actions.setLoaded(false))}
            to="/"
            className="navbar-brand"
          >
            <b>QuizUp</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex myforminput">
              <div className="d-flex btn-light mynav-input">
                <input
                  className="form-control me-2"
                  type="input"
                  placeholder="Enter Code"
                  aria-label="Search"
                />
                <button type="button" className="btn btn-dark">
                  JOIN
                </button>
              </div>
              <button type="button" className="btn btn-light ms-5 ">
                <Link to="/signup">SignUp</Link>
              </button>
              <button type="button" className="btn btn-light ms-3">
                <Link to="/login">LogIn</Link>
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(NavBar);
