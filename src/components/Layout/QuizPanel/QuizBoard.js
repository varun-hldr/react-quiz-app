import React from "react";
import * as Page from "./QuizPages";
import "../../css/QuizBoard.css";

const QuizBoard = ({ quiz }) => {
  const random = [];
  while (random.length < 10) {
    random.push(parseInt(0 + Math.random() * 4));
  }

  return (
    <div className="quizboard">
      {/* <Page.EnterName /> */}
      <Page.FillQuiz quiz={quiz} random={random} />
      {/* <Page.QuizResult /> */}
    </div>
  );
};

export default QuizBoard;
