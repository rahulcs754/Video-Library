import { usePlaylist } from "../../../Context";
import { removeVideoFromPlaylist } from "../../../ApiService";
export const VideoCart = ({ _id, author, thumnailMedium, playlistId }) => {
  const { playlistDispatch } = usePlaylist();

  const removeHandler = async (id, playlistId) => {
    const encodeToken = localStorage.getItem("encodedToken");
    const res = await removeVideoFromPlaylist(playlistId, id, encodeToken);
    console.log(res);
    playlistDispatch({
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      videoId: id,
      playlistId: playlistId,
    });
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
          <span>{author}</span>{" "}
          <i
            className="far fa-trash pointer"
            onClick={() => removeHandler(_id, playlistId)}
          ></i>
        </div>
      </div>
    </div>
  );
};
