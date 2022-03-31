export const WatchlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        watchlater: action.payload,
      };
    case "ADD_TO_WATCHLIST":
      return { ...state, watchlater: [...state.watchlater, action.payload] };

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        cart: state.watchlater.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};
