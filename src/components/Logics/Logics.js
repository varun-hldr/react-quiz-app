import * as female from "../img/profiles/female";
import * as male from "../img/profiles/male";

export const imageGenerator = (user) => {
  const rand = parseInt(0 + Math.random() * 4);
  const fimg = [female.a, female.b, female.c, female.d];
  const mimg = [male.a, male.b, male.c, male.d];
  if (user.gender === "male") {
    return mimg[rand];
  } else {
    return fimg[rand];
  }
};

export const generateID = (quizList) => {
  if (quizList) {
    if (quizList.length < 1) {
      return 1;
    } else {
      let id = quizList.map((quiz) => quiz.id);
      return Math.max(...id) + 1;
    }
  } else {
    return 765;
  }
};

export const highestFinder = (array) => {
  array.sort(function (a, b) {
    return b.points - a.points;
  });
  return array;
};

export const positionHandler = (index) => {
  let position = "1st";
  if (index === 2) {
    position = "2nd";
  } else if (index === 3) {
    position = "3rd";
  } else if (index > 3) {
    position = `${index}th`;
  }
  return position;
};

export const getLeaderboard = (array) => {
  const users = highestFinder(array);
  return users.map((user, index) => {
    return (
      <div key={index} className="d-flex justify-content-between">
        <h5>
          <b>{index + 1}. </b>
          {user.name}
        </h5>
        <h5>{user.points}</h5>
      </div>
    );
  });
};

export const getQuizList = (quiz, index, onClickHandler, quizList) => {
  return (
    <div className="quizLst">
      <div className="quizName d-flex">
        <span>{index + 1}</span>
        <h2>
          <b>QuizUp: </b>The Quizzard {quiz.id}
        </h2>
      </div>
      <div className="quizOptions d-flex justify-content-evenly">
        <button
          onClick={(e) => onClickHandler(quiz.id, "view", quizList)}
          className="view"
        >
          VIEW
        </button>
        <button
          onClick={(e) => onClickHandler(quiz.id, "play", quizList)}
          className="edit"
        >
          PLAY
        </button>
        <button
          onClick={(e) => onClickHandler(quiz.id, "del", quizList)}
          className="del"
        >
          DEL
        </button>
      </div>
    </div>
  );
};
