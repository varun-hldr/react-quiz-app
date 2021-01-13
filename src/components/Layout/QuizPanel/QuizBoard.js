import React from "react";
import * as Page from "./QuizPages";
import "../../css/QuizBoard.css";

const QuizBoard = ({ quiz }) => {
  return (
    <div className="quizboard">
      {/* <Page.EnterName /> */}
      <Page.FillQuiz quiz={quiz} />
      {/* <Page.QuizResult /> */}
    </div>
  );
};

export default QuizBoard;
