const myApi = "https://play-quizup-api.herokuapp.com/";

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
  const apiData = fetch(`${myApi}users/${id}`, {
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
  const response = fetch(`${myApi}leaderboard`, {
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
    let response = await fetch(`${myApi}users/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function postUser(user) {
  try {
    let response = await fetch(`${myApi}users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function updateGlobalLeader(user) {
  console.log(user);
  try {
    let response = await fetch(`${myApi}leaderboard/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function postGlobalLeader(user) {
  try {
    let response = await fetch(`${myApi}leaderboard`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}
