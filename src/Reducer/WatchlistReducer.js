export const WatchlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      const { payload } = action;
      const findObj = state.watchLater.includes(payload);
      if (findObj === false) {
        return { ...state, watchLater: [...state.watchLater, payload] };
      } else {
        return {
          ...state,
          watchLater: state.watchLater.filter((item) => item !== payload),
        };
      }

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        cart: state.watchLater.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};
