export const AuthReducer = (state, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        message: "",
        isUserLoggedIn: true,
        encodedToken: action.encodedToken,
        userDetails: action.userDetails,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        loading: false,
        message: "",
        isUserLoggedIn: false,
        encodedToken: "",
        userDetails: {},
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        message: error,
      };
    default:
      return state;
  }
};
