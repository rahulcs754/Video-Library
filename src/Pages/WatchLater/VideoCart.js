import { removeWatchlater } from "../../ApiService";
import { useWatchLater, useVideo } from "../../Context";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const VideoCart = ({ _id, title, thumnailMedium }) => {
  const { VideoDispatch } = useVideo();
  const { watchLaterDispatch } = useWatchLater();

  const removeHandler = async (id) => {
    const encodeToken = localStorage.getItem("encodedToken");

    const {
      data: { watchlater },
      status,
    } = await removeWatchlater(id, encodeToken);

    if (status === 200 || status === 201) {
      toast.warning("Remove video from the Watch later Videos List");
      watchLaterDispatch({
        type: "SET_WATCHLATER",
        payload: watchlater,
      });
      VideoDispatch({ type: "IS_WATCHLATER", payload: id });
    }
  };
  return (
    <div className="card card-overlay video_card">
      <Link to={`/watch/${_id}`}>
        <img
          src={thumnailMedium.url}
          className="card-image video_image"
          alt="Card-Image"
        />
      </Link>
      <div className="card-header">
        <div className="card-title video_title space-between align-item">
          <span className="text_ellipsis">{title}</span>
          <i
            className="far fa-trash pointer"
            onClick={() => removeHandler(_id)}
          ></i>
        </div>
      </div>
    </div>
  );
};
