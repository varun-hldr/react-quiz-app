import React from "react";
import { Link } from "react-router-dom";
import "../../css/CreateQuiz.css";

const SuccessPage = () => {
  return (
    <div className="pt-4">
      <div className="succesMain">
        <div className="successQuizTick">
          <div className="succesQuiz">
            <div className="rightTick">
              <h1>✔</h1>
            </div>
          </div>
          <div className="successDown">
            <span className="successText">
              Congratulations, your quiz has been successfully created.
            </span>
          </div>
          <button className="successButton">
            <Link to="/dashboard">Go to dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
