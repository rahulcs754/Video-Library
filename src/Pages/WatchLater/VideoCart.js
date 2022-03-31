import { removeWatchlater } from "../../ApiService";
import { useWatchLater, useVideo } from "../../Context";
export const VideoCart = ({ _id, title, thumnailMedium }) => {
  const { VideoDispatch } = useVideo();
  const { watchLaterDispatch } = useWatchLater();

  const removeHandler = async (id) => {
    const encodeToken = localStorage.getItem("encodedToken");

    const { status } = await removeWatchlater(id, encodeToken);

    if (status === 200 || status === 201) {
      watchLaterDispatch({
        type: "REMOVE_FROM_LIKED",
        payload: id,
      });
      VideoDispatch({ type: "IS_LIKED", payload: id });
    }
  };
  const titleSet = title.length > 20 ? title.slice(0, 20) + "..." : title;
  return (
    <div className="card card-overlay video_card">
      <img
        src={thumnailMedium.url}
        className="card-image video_image"
        alt="Card-Image"
      />
      <div className="card-header">
        <div className="card-title video_title space-between">
          <span>{titleSet}</span>
          <i
            className="far fa-trash pointer"
            onClick={() => removeHandler(_id)}
          ></i>
        </div>
      </div>
    </div>
  );
};
