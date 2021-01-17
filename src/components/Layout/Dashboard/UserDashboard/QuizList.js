import React from "react";
import * as Logics from "../../../Logics/Logics";
import "../../../css/UserDashboard.css";

const QuizList = ({ quizList, onClickHandler }) => {
  return (
    <div className="quizDetails">
      <h3>All Quizzes Created by you</h3>
      <div className="quizList overflow-auto">
        {quizList.map((quiz, index) =>
          Logics.getQuizList(quiz, index, onClickHandler, quizList)
        )}
      </div>
    </div>
  );
};

export default QuizList;
