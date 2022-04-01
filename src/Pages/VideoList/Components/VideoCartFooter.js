import {
  useAuthData,
  useVideo,
  useWatchLater,
  useLike,
} from "../../../Context/";
import { useNavigate } from "react-router-dom";
import { PlaylistChoose } from "./PlaylistChoose";
import { useState } from "react";
import { addLikes, removeFromLikes } from "../../../ApiService/Liked";

export const VideoCartFooter = (videoDetails) => {
  const { _id, isWatchlist, isLiked } = videoDetails;
  const [selectPlaylist, setSelectPlaylist] = useState(false);
  const navigate = useNavigate();
  const { userAuth } = useAuthData();
  const { VideoDispatch } = useVideo();
  const { isUserLoggedIn } = userAuth;
  const { watchLaterDispatch } = useWatchLater();
  const {
    LikeDispatch,
    LikeState: { liked },
  } = useLike();

  const clickHandler = (id) => {
    // add to watchlater using context
    watchLaterDispatch({ type: "ADD_TO_WATCHLIST", payload: id });
    VideoDispatch({ type: "IS_WATCHLATER", payload: id });
  };

  const likeHandler = async (videoDetails) => {
    const token = localStorage.getItem("encodedToken");
    //api calls
    const { data, status } = await addLikes(videoDetails, token);

    if (status === 200 || status === 201) {
      LikeDispatch({ type: "SET_LIKES", payload: data.likes });
    }
    if (data === undefined) {
      //api calls
      const removeData = await removeFromLikes(videoDetails._id, token);
      if (removeData.status === 200 || removeData.status === 201) {
        LikeDispatch({ type: "SET_LIKES", payload: removeData.data.likes });
      }
    }
    VideoDispatch({ type: "IS_LIKED", payload: videoDetails._id });
  };

  return (
    <>
      {isUserLoggedIn === true ? (
        <>
          <button
            className={`btn btn-primary`}
            onClick={() => clickHandler(_id)}
          >
            {isWatchlist ? "Added  Watch Later" : "Watch Later"}
          </button>

          <i
            className={` fa fa-thumbs-up pointer ${
              isLiked ? "text-warning" : ""
            } `}
            onClick={() => likeHandler(videoDetails)}
          ></i>

          <i
            className="far fa-bookmark pointer"
            onClick={() => setSelectPlaylist((prev) => !prev)}
          ></i>
        </>
      ) : (
        <>
          <button
            className={`btn btn-primary`}
            onClick={() => navigate("/login")}
          >
            Watch Later
          </button>

          <i className="fa fa-thumbs-up" onClick={() => navigate("/login")}></i>

          <i className="far fa-bookmark" onClick={() => navigate("/login")}></i>
        </>
      )}

      {selectPlaylist ? (
        <PlaylistChoose setView={setSelectPlaylist} videoIdNumber={_id} />
      ) : null}
    </>
  );
};
