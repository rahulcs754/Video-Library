import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useAuthData, useVideo, useWatchLater, useLike } from "../../Context";
import { PlaylistChoose } from "../VideoList/Components/PlaylistChoose";
import { addLikes, removeFromLikes } from "../../ApiService/Liked";
import { addWatchlater, removeWatchlater } from "../../ApiService";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

export const SingleVideo = () => {
  const [selectPlaylist, setSelectPlaylist] = useState(false);
  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();
  const { VideoDispatch } = useVideo();
  const { watchLaterDispatch } = useWatchLater();
  const { LikeDispatch } = useLike();

  const { videoid } = useParams();
  const { VideoState } = useVideo();
  const { data: ListOFVideo } = VideoState;
  const chooseVideo = ListOFVideo.find((item) => item._id === videoid);

  const RelatedVideo = ListOFVideo.slice(0, 5);

  const addWatchLaterHandler = async (videoDetails) => {
    // add to watchlater using context
    const token = localStorage.getItem("encodedToken");
    //call api service
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
        progress: undefined,
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

  const opts = {
    height: "600",
    width: "800",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="video_watch m-m flex flex-row">
      {chooseVideo ? (
        <>
          <div>
            <div className="video_watch_left  mr-l">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${chooseVideo.videoId}`}
                width="800px"
                height="400px"
              />
            </div>
            <div className="video_watch_footer flex flex-row space-between align-item">
              <div className="f-m video_left_text">{chooseVideo.title}</div>
              <div className="right_button_part flex flex-row space-between align-item">
                {isUserLoggedIn ? (
                  <>
                    <button
                      className={`btn btn-primary`}
                      onClick={() => addWatchLaterHandler(chooseVideo)}
                    >
                      {chooseVideo.isWatchlist
                        ? "Remove From Watch Later"
                        : "Add To Watch Later"}
                    </button>
                    <i
                      className={` fa fa-thumbs-up pointer ${
                        chooseVideo.isLiked ? "text-warning" : ""
                      } `}
                      onClick={() => likeHandler(chooseVideo)}
                    ></i>
                    <i
                      className="far fa-bookmark pointer"
                      onClick={() => setSelectPlaylist((prev) => !prev)}
                    ></i>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="video_Watch_right p-m">
            <h3 className="mb-m">Related Video </h3>
            <>
              {RelatedVideo &&
                RelatedVideo.map(({ _id, thumnailDefault, title }) => {
                  return (
                    <Link to={`/watch/${_id}`}>
                      <div className="card card-rs mb-s video_hz_card">
                        <div className="card-part-horizontal">
                          <div className="card-img-horizontal">
                            <img
                              src={thumnailDefault.url}
                              className="card-image-hr"
                              alt="video images"
                            />
                          </div>
                          <div className="card-header-horizontal">
                            <div className="f-s">{title}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </>
          </div>
        </>
      ) : null}

      {selectPlaylist ? (
        <PlaylistChoose
          setView={setSelectPlaylist}
          videoIdNumber={chooseVideo._id}
        />
      ) : null}
    </div>
  );
};
