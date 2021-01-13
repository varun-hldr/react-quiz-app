const initialState = {
  isLoaded: false,
  quizLoaded: false,
  lbLoaded: false,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "QUIZ_DATA":
      return { ...state, quizList: action.payload, quizLoaded: true };
    case "GLOBAL_LEADERBOARD":
      return { ...state, gLeaderboard: action.payload, lbLoaded: true };

    case "LOADED":
      return { ...state, isLoaded: action.payload };

    default:
      return state;
  }
};

export default quizReducer;
