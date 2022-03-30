export const VideoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_VIDEO_LIST":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_CATEGORY_LIST":
      return {
        ...state,
        videoCategory: action.payload,
      };
    case "IS_DISLIKED":
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload
            ? { ...item, likes: item.likes - 1, isDisliked: !item.isDisliked }
            : item
        ),
        data: { ...state.data },
      };

    case "IS_LIKED":
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload
            ? { ...item, likes: item.likes + 1, isLiked: !item.isLiked }
            : item
        ),
      };

    case "IS_WATCHLATER":
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload
            ? { ...item, isWatchlist: !item.isWatchlist }
            : item
        ),
      };

    case "ADD_AND_REMOVE_ERROR":
      return;
    case "LOADING":
      return;
    default:
      return state;
  }
};
