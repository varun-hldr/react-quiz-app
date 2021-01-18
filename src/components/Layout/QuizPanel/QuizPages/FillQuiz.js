import React, { useState } from "react";
import Quiz from "./Quiz";
import "../../../css/Quiz.css";

const FillQuiz = ({ quiz, random, onSubmitHandler }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [points, setPoints] = useState(0);

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
        setPoints={setPoints}
        points={points}
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
              <button
                onClick={(e) => onSubmitHandler(points)}
                className="mybtn submit-button"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FillQuiz;
