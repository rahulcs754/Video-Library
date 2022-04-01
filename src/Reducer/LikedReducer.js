export const likedReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return {
        ...state,
        liked: action.payload,
      };

    default:
      return state;
  }
};
