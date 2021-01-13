export const getQuiz = (id) => {
  const completeURL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`;
  const response = fetch(completeURL, { method: "GET" }).then((res) =>
    res.json()
  );
  return {
    type: "QUIZ_DATA",
    payload: response,
  };
};

const leaderBoardApi = "http://quiz-app-data.herokuapp.com/global_ranking";

export const getGlobalLeaderBoard = () => {
  const response = fetch(leaderBoardApi, { method: "GET" }).then((res) =>
    res.json()
  );
  return {
    type: "GLOBAL_LEADERBOARD",
    payload: response,
  };
};

export const setLoaded = (check) => {
  return {
    type: "LOADED",
    payload: check,
  };
};
