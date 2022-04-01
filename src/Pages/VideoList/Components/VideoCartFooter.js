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
import { addWatchlater, removeWatchlater } from "../../../ApiService";
import { ToastContainer, toast } from "react-toastify";

export const VideoCartFooter = (videoDetails) => {
  const { _id, isWatchlist, isLiked } = videoDetails;
  const [selectPlaylist, setSelectPlaylist] = useState(false);
  const navigate = useNavigate();
  const { userAuth } = useAuthData();
  const { VideoDispatch } = useVideo();
  const { isUserLoggedIn } = userAuth;
  const {
    watchLaterDispatch,
    watchLaterState: { watchlater },
  } = useWatchLater();
  const {
    LikeDispatch,
    LikeState: { liked },
  } = useLike();

  const addWatchLaterHandler = async (videoDetails) => {
    // add to watchlater using context
    const token = localStorage.getItem("encodedToken");
    const { data, status } = await addWatchlater(videoDetails, token);
    if (status === 200 || status === 201) {
      watchLaterDispatch({
        type: "SET_WISHLIST",
        payload: data.watchlater,
      });
      toast.success("Add video to the Watch Later list", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (data === undefined) {
      const {
        status: removeStatuse,
        data: { watchlater },
      } = await removeWatchlater(videoDetails._id, token);
      if (removeStatuse === 200 || removeStatuse === 201) {
        watchLaterDispatch({
          type: "SET_WISHLIST",
          payload: watchlater,
        });
      }
      toast.warning("Remove video from the Watch Later List", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    VideoDispatch({ type: "IS_WATCHLATER", payload: videoDetails._id });
  };

  const likeHandler = async (videoDetails) => {
    const token = localStorage.getItem("encodedToken");
    const { data, status } = await addLikes(videoDetails, token);

    if (status === 200 || status === 201) {
      LikeDispatch({ type: "SET_LIKES", payload: data.likes });
      toast.success("Add video to the Liked Videos List", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (data === undefined) {
      const removeStatus = await removeFromLikes(videoDetails._id, token);

      if (removeStatus.status === 200 || removeStatus.status === 201) {
        LikeDispatch({ type: "REMOVE_FROM_LIKED", payload: videoDetails._id });
        toast.warning("Remove video from the Liked Videos List", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            onClick={() => addWatchLaterHandler(videoDetails)}
          >
            {isWatchlist ? "Remove From Watch Later" : "Add To Watch Later"}
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
