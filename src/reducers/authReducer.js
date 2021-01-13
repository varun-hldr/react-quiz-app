const initialState = {
  token: null,
  isAuth: false,
};

const authReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case "AUTH_LOGIN":
      return { token: action.payload, isAuth: true };

    case "AUTH_LOGOUT":
      return { token: null, isAuth: false };

    default:
      return false;
  }
};

export default authReducer;
