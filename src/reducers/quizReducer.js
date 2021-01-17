const initialState = {
  qLoaded: false,
  lbLoaded: false,
  uLoaded: false,
};

export default function quizReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "QUIZ_DATA":
      return { ...state, quizList: action.payload, qLoaded: true };
    case "GLOBAL_LEADERBOARD":
      return {
        ...state,
        gLeaderboard: action.payload,
        lbLoaded: true,
      };
    case "LOADED":
      return { ...state, qLoaded: false, lbLoaded: false };
    case "USERS":
      return { ...state, users: action.payload, uLoaded: true };
    default:
      return state;
  }
}
