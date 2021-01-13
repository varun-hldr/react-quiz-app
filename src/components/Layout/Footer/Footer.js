import React, { Component } from "react";
import "../../css/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="container footer">
        <div className="myfooter">
          <div className="d-flex justify-content-between">
            <h6>© QuizUP</h6>
            <h6>
              Devloped by{" "}
              <a
                className="link-light"
                href="https://github.com/aniket-teltumbade-au9"
              >
                ANIKET
              </a>{" "}
              &{" "}
              <a
                className="link-light"
                href="https://github.com/varun-haldhar-au9"
              >
                VARUN
              </a>{" "}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
