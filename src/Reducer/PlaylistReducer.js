export const PlaylistReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case "ADD_PLAYLIST":
      return { ...state, playlists: payload };

    case "STORE_VIDEO":
      const findObj = state.playlists.find((item) =>
        item.videos.includes(action.videoId)
      );
      if (findObj === undefined) {
        return {
          ...state,
          playlists: state.playlists.map((item) =>
            item._id === action.playlistId
              ? { ...item, videos: [...item.videos, action.videoId] }
              : item
          ),
        };
      } else {
        return {
          ...state,
          playlists: state.playlists.map((item) =>
            item._id === findObj._id
              ? {
                  ...item,
                  videos: item.videos.filter((item) => item !== action.videoId),
                }
              : item
          ),
        };
      }

    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((item) =>
          item._id === action.playlistId
            ? {
                ...item,
                videos: item.videos.filter((item) => item !== action.videoId),
              }
            : item
        ),
      };
    case "ERROR_SET":
      return { ...state, error: action.error, errMsg: action.errMsg };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
