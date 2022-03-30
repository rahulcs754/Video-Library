export const likedReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return {
        ...state,
        liked: action.payload,
      };
    case "ADD_TO_LIKED":
      const { payload } = action;
      const findObj = state.liked.includes(payload);
      if (findObj === false) {
        return { ...state, liked: [...state.liked, payload] };
      } else {
        return {
          ...state,
          liked: state.liked.filter((item) => item._id !== payload),
        };
      }

    case "REMOVE_FROM_LIKED":
      console.log(action);
      return {
        ...state,
        liked: state.liked.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};
