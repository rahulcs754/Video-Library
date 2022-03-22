const VideoReducer = (state, action) => {
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
    case "INCREASE_PRODUCT":
      return;
    case "DECREASE_PRODUCT_QTY":
      return;
    case "IS_LIKED":
      return;

    case "IS_SELECTED":
      return;
    case "ADD_AND_REMOVE_ERROR":
      return;
    case "LOADING":
      return;
    default:
      return state;
  }
};

export default VideoReducer;
