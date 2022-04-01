import { usePlaylist } from "../../../Context";
import { removeVideoFromPlaylist } from "../../../ApiService";
import { toast } from "react-toastify";
export const VideoCart = ({
  _id,
  title,
  author,
  thumnailMedium,
  playlistId,
}) => {
  const { playlistDispatch } = usePlaylist();

  const removeHandler = async (id, playlistId) => {
    const encodeToken = localStorage.getItem("encodedToken");

    const {
      data: { playlist },
      status,
    } = await removeVideoFromPlaylist(playlistId, id, encodeToken);

    if (status === 200 || status === 201) {
      toast.warning("Remove video from the Custom Playlist List", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      playlistDispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        videoId: id,
        playlistId: playlistId,
      });
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
          <span className="text_ellipsis">{title}</span>
          <i
            className="far fa-trash pointer"
            onClick={() => removeHandler(_id, playlistId)}
          ></i>
        </div>
      </div>
    </div>
  );
};
