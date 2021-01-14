import React, { useState } from "react";
import Quiz from "./Quiz";
import "../../../css/Quiz.css";

const FillQuiz = ({ quiz, random }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const next = currentPage + 1;
  const prev = next - 1;
  const currentQuiz = quiz.slice(prev, next);

  const onClickHandler = (currentPage) => {
    setCurrentPage(currentPage);
  };
  return (
    <div className="fill-quiz">
      <Quiz
        currentQuiz={currentQuiz}
        currentPage={currentPage}
        random={random[currentPage]}
      />
      <div className="buttons">
        <div className="btn-div col">
          {currentPage > 0 ? (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="mybtn prev-button"
            >
              Previous
            </button>
          ) : null}
        </div>
        <div className="btn-div col">
          <div className="d-flex justify-content-end">
            {currentPage < 9 ? (
              <button
                onClick={() => onClickHandler(currentPage + 1)}
                className="mybtn next-button"
              >
                Next
              </button>
            ) : (
              <button className="mybtn submit-button">Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FillQuiz;
