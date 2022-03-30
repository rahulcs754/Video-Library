import { usePlaylist } from "../../../Context";
import { removePlaylist } from "../../../ApiService";
export const PlaylistTitle = ({ _id, title }) => {
  const { playlistDispatch } = usePlaylist();

  const removeHandler = async (id) => {
    const encodeToken = localStorage.getItem("encodedToken");
    const res = await removePlaylist(id, encodeToken);
    console.log(res);
    playlistDispatch({ type: "REMOVE_PLAYLIST", payload: id });
  };

  return (
    <div className="grid-container  playlist_header">
      <div className="space-between">
        <strong className="mr-m">Playlist Name: {title}</strong>
        <i
          className="far fa-trash pointer"
          onClick={() => removeHandler(_id)}
        ></i>
      </div>
    </div>
  );
};
