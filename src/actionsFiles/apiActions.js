const myApi = "http://quiz-app-data.herokuapp.com/";

export const getQuiz = (id) => {
  const completeURL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`;
  let response = [];
  let apiData = fetch(completeURL, { method: "GET" }).then((res) => res.json());
  response = apiData.then(function (result) {
    return result.results;
  });
  return {
    type: "QUIZ_DATA",
    payload: response,
  };
};

export const getUserQuiz = (id, id2) => {
  let response = [];
  const apiData = fetch(`http://quiz-app-data.herokuapp.com/users/${id}`, {
    method: "GET",
  }).then((res) => res.json());
  response = apiData.then(function (result) {
    const data = result.quizList.filter((quiz) => quiz.id == id2);
    return data[0].quiz;
  });
  return {
    type: "QUIZ_DATA",
    payload: response,
  };
};

export const getGlobalLeaderBoard = () => {
  const response = fetch(`${myApi}global_ranking`, {
    method: "GET",
  }).then((res) => res.json());
  return {
    type: "GLOBAL_LEADERBOARD",
    payload: response,
  };
};

export const getUsers = () => {
  const response = fetch(`${myApi}users`, {
    method: "GET",
  }).then((res) => res.json());
  return {
    type: "USERS",
    payload: response,
  };
};

export const setUser = (user, token) => {
  if (!token) {
    token = "jvgvhv";
  }
  return {
    type: "AUTH_LOGIN",
    payload: {
      token: token,
      user: user,
    },
  };
};

export async function updateUser(user) {
  try {
    let response = await fetch(
      `http://quiz-app-data.herokuapp.com/users/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}
