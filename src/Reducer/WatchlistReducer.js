export const WatchlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WATCHLATER":
      return {
        ...state,
        watchlater: action.payload,
      };

    default:
      return state;
  }
};
