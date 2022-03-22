import { createContext, useContext, useReducer } from "react";
import VideoReducer from "../Reducer/VideoReducer";

import { useEffect } from "react";

import axios from "axios";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const IntialValue = {
    data: [],
    videoCategory: [],
    loading: false,
    error: false,
  };

  const [VideoState, VideoDispatch] = useReducer(VideoReducer, IntialValue);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/videos");
      VideoDispatch({ type: "ADD_VIDEO_LIST", payload: data.videos });

      const getCategory = await axios.get("/api/categories");
      VideoDispatch({
        type: "ADD_CATEGORY_LIST",
        payload: getCategory.data.categories,
      });
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ VideoState, VideoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
