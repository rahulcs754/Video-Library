import { useAuthData, useVideo, useWatchLater } from "../../../Context/";
import { useNavigate } from "react-router-dom";

export const VideoCartFooter = ({ _id, isWatchlist, isDisliked, isLiked }) => {
  const navigate = useNavigate();
  const { userAuth } = useAuthData();
  const { VideoDispatch } = useVideo();
  const { isUserLoggedIn } = userAuth;
  const { watchLaterDispatch } = useWatchLater();

  const clickHandler = (id) => {
    // add to watchlater using context

    watchLaterDispatch({ type: "ADD_TO_WATCHLIST", payload: id });
    VideoDispatch({ type: "IS_WATCHLATER", payload: id });
  };

  const likeHandler = (id) => {
    VideoDispatch({ type: "IS_LIKED", payload: id });
  };
  const dislikeHandler = (id) => {
    VideoDispatch({ type: "IS_DISLIKED", payload: id });
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
            className={` fa fa-thumbs-up ${isLiked ? "text-warning" : ""} `}
            onClick={() => likeHandler(_id)}
          ></i>
          <i
            className={` fa fa-thumbs-down ${
              isDisliked ? "text-warning" : ""
            } `}
            onClick={() => dislikeHandler(_id)}
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
          <i
            className="fa fa-thumbs-down"
            onClick={() => navigate("/login")}
          ></i>
        </>
      )}
    </>
  );
};
