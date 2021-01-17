const initialState = {
  token: "",
  isAuth: false,
  user: {},
};

export default function authReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        user: action.payload.user,
      };
    case "AUTH_LOGOUT":
      return { ...state, token: null, isAuth: false };

    default:
      return state;
  }
}
