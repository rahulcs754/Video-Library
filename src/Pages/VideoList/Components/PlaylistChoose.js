import { useState, useEffect } from "react";
import { usePlaylist } from "../../../Context";
import { getPlaylist, addVideoPlaylist } from "../../../ApiService";
import { ToastContainer, toast } from "react-toastify";
export const PlaylistChoose = ({ setView, videoIdNumber }) => {
  const [playlistFormInput, setPlaylistFormInput] = useState({
    name: "",
    description: "",
  });

  const [playPlaylistData, setPlaylistdata] = useState([]);

  const {
    playlistState: { playlists },
    playlistDispatch,
  } = usePlaylist();

  const viewhandler = () => {
    setView((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const encodeToken = localStorage.getItem("encodedToken");
      const { playlists, status } = await getPlaylist(encodeToken);
      if (status === 200 || status === 201) {
        setPlaylistdata(playlists);
      }
    })();
  }, []);

  const saveHanlder = async (videoIdNumber, playlistId) => {
    const encodeToken = localStorage.getItem("encodedToken");
    const res = await addVideoPlaylist(playlistId, videoIdNumber, encodeToken);

    playlistDispatch({
      type: "STORE_VIDEO",
      videoId: videoIdNumber,
      playlistId: playlistId,
    });

    setView((prev) => !prev);
    toast.success("Add video to the Custom Playlist List", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="modal playlistmodel">
      <div className="modal-content modal-s">
        <div className="modal-header text-center">
          <h3 className="modal-header-title">Choose any one playlist </h3>
          <span className="modal-close" onClick={viewhandler}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <ul className="list">
            {playPlaylistData &&
              playPlaylistData.map(({ _id, title }) => {
                return (
                  <li className="list-item-stacked" key={_id}>
                    <input
                      name="playlistname"
                      type="checkbox"
                      onChange={() => saveHanlder(videoIdNumber, _id)}
                    />
                    {title}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
