import React from "react";
import { Link } from "react-router-dom";
import "../../../css/Quizresult.css";

const QuizResult = ({ totalPoints, setTotalPoints, params }) => {
  console.log(params.id);
  const param = `/quiz/${params.id}`;
  return (
    <div>
      <div className="scoreBoard">
        <h1>Result</h1>
        <h5>Total correct answers is {totalPoints / 10} out of 10 questions</h5>
        <div className="score">
          <h2>Your final score is</h2>
          <div className="point">
            <h1>{totalPoints}</h1>
          </div>
        </div>
        <button onClick={setTotalPoints}>
          <Link to={param}>Try Again</Link>
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
