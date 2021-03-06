import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAuthData,
  useVideo,
  useWatchLater,
  useLike,
  useHistory,
} from "../../Context";
import { PlaylistChoose } from "../VideoList/Components/PlaylistChoose";
import { addLikes, removeFromLikes } from "../../ApiService/Liked";
import { addWatchlater, removeWatchlater, addHistory } from "../../ApiService";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

export const SingleVideo = () => {
  const [isLoader, setLoader] = useState(true);
  const [selectPlaylist, setSelectPlaylist] = useState(false);
  const [playVideo, setPlayVideo] = useState({});
  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();
  const { VideoDispatch } = useVideo();
  const { watchLaterDispatch } = useWatchLater();
  const { LikeDispatch } = useLike();
  const { HistoryDispatch } = useHistory();
  const navigate = useNavigate();

  const { videoid } = useParams();
  const { VideoState } = useVideo();
  const { data } = VideoState;
  useEffect(() => {
    const chooseVideo = data.find((item) => item?.videoId === videoid);
    console.log(data, videoid, chooseVideo);
    if (chooseVideo) {
      setPlayVideo(chooseVideo);
    }
  }, [data]);

  //add video watchlater list
  const addWatchLaterHandler = async (videoDetails) => {
    const token = localStorage.getItem("encodedToken");
    //call api service
    const { data, status } = await addWatchlater(videoDetails, token);
    if (status === 200 || status === 201) {
      watchLaterDispatch({
        type: "SET_WISHLIST",
        payload: data.watchlater,
      });
      toast.success("Add video to the Watch Later list");
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

      toast.warning("Remove video from the Watch Later List");
    }

    VideoDispatch({ type: "IS_WATCHLATER", payload: videoDetails._id });
  };

  // Add video to liked video
  const likeHandler = async (videoDetails) => {
    const token = localStorage.getItem("encodedToken");
    //call api to add  video in liked list
    const { data, status } = await addLikes(videoDetails, token);

    if (status === 200 || status === 201) {
      LikeDispatch({ type: "SET_LIKES", payload: data.likes });
      toast.success("Add video to the Liked Videos List");
    }
    if (data === undefined) {
      const removeStatus = await removeFromLikes(videoDetails._id, token);

      if (removeStatus.status === 200 || removeStatus.status === 201) {
        LikeDispatch({ type: "REMOVE_FROM_LIKED", payload: videoDetails._id });
        toast.warning("Remove video from the Liked Videos List");
      }
    }
    VideoDispatch({ type: "IS_LIKED", payload: videoDetails._id });
  };

  // add video to history page
  const addHistoryHandler = async (item) => {
    navigate(`/watch/${item.videoId}`);
    const encodeToken = localStorage.getItem("encodedToken");

    const { history, status } = await addHistory(item, encodeToken);

    if (status === 200 || status === 201) {
      HistoryDispatch({ type: "SET_HISTORY", payload: history });
    }
  };
  const onloaded = () => {
    setLoader(false);
  };

  return (
    <div className="video_watch m-m flex flex-row">
      {isLoader ? <div className="loader"></div> : null}
      <>
        <div className="video_watch_left  mr-l">
          <div className="video_player_react">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${playVideo.videoId}`}
              width="100%"
              height="400px"
              controls="true"
              onReady={onloaded}
            />
          </div>

          <div className="video_watch_details flex flex-row space-between align-item">
            <div className="video_left_text width-100">{playVideo.title}</div>
            <div className="width-100">Author:{playVideo.author}</div>
            <div className="right_button_part flex flex-row space-between align-item">
              {isUserLoggedIn ? (
                <>
                  <button
                    className={`btn btn-primary`}
                    onClick={() => addWatchLaterHandler(playVideo)}
                  >
                    {playVideo.isWatchlist
                      ? "Remove From Watch Later"
                      : "Add To Watch Later"}
                  </button>
                  <i
                    className={` fa fa-thumbs-up pointer ${
                      playVideo.isLiked ? "text-warning" : ""
                    } `}
                    onClick={() => likeHandler(playVideo)}
                  ></i>
                  <i
                    className="far fa-list pointer"
                    onClick={() => setSelectPlaylist((prev) => !prev)}
                  ></i>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="video_watch_right  mr-l">
          <span className="f-m"></span>
        </div>
      </>

      {selectPlaylist ? (
        <PlaylistChoose
          setView={setSelectPlaylist}
          videoIdNumber={playVideo._id}
        />
      ) : null}
    </div>
  );
};
