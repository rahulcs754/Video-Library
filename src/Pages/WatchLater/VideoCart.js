import { removeWatchlater } from "../../ApiService";
import { useWatchLater, useVideo } from "../../Context";
import { toast } from "react-toastify";
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
      toast.warning("Remove video from the Watch later Videos List", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      watchLaterDispatch({
        type: "SET_WATCHLATER",
        payload: watchlater,
      });
      VideoDispatch({ type: "IS_WATCHLATER", payload: id });
    }
  };
  return (
    <div className="card card-overlay video_card">
      <img
        src={thumnailMedium.url}
        className="card-image video_image"
        alt="Card-Image"
      />
      <div className="card-header">
        <div className="card-title video_title space-between">
          <span className="e">{title}</span>
          <i
            className="far fa-trash pointer"
            onClick={() => removeHandler(_id)}
          ></i>
        </div>
      </div>
    </div>
  );
};
