import { removeFromLikes } from "../../ApiService/Liked";
import { useLike, useVideo } from "../../Context";
export const VideoCart = ({ _id, title, thumnailMedium }) => {
  const { VideoDispatch } = useVideo();
  const { LikeDispatch } = useLike();

  const removeHandler = async (id) => {
    const encodeToken = localStorage.getItem("encodedToken");

    const { status } = await removeFromLikes(id, encodeToken);

    if (status === 200 || status === 201) {
      LikeDispatch({
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
