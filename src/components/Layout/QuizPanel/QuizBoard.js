import React, { useState } from "react";
import * as Page from "./QuizPages";
import "../../css/QuizBoard.css";

const QuizBoard = ({ quiz, params }) => {
  const [totalPoints, setTotalPoints] = useState(null);

  const random = [];
  while (random.length < 10) {
    random.push(parseInt(0 + Math.random() * 4));
  }
  console.log(totalPoints);
  return (
    <div className="quizboard">
      {totalPoints === null ? (
        <Page.FillQuiz
          quiz={quiz}
          random={random}
          setTotalPoints={setTotalPoints}
        />
      ) : (
        <Page.QuizResult
          totalPoints={totalPoints}
          setTotalPoints={(e) => setTotalPoints(null)}
          params={params}
        />
      )}
    </div>
  );
};

export default QuizBoard;
