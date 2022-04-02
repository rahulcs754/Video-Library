import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addPlaylist } from "../../../ApiService";
import { usePlaylist } from "../../../Context";
import { toast } from "react-toastify";
export const AddplaylistForm = ({ setViewInput }) => {
  const [playlistFormInput, setPlaylistFormInput] = useState({
    name: "",
    description: "",
  });

  const { name, description } = playlistFormInput;
  const { playlistDispatch } = usePlaylist();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPlaylistFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const viewhandler = () => {
    setViewInput((prev) => !prev);
  };

  const addHandler = async () => {
    const newplaylist = {
      _id: uuid(),
      title: name,
      description: description,
      videos: [],
    };

    if (name !== "" && description !== "") {
      const encodeToken = localStorage.getItem("encodedToken");
      const { playlists, status } = await addPlaylist(newplaylist, encodeToken);

      if (status === 201 || status === 200) {
        toast.success("Add video to the Custom Playlist List", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        playlistDispatch({
          type: "ADD_PLAYLIST",
          payload: playlists,
        });
        setViewInput((prev) => !prev);
      }
    } else {
      toast.warning("Please fill both fields", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="modal playlistmodel">
      <div className="modal-content modal-s">
        <div className="modal-header text-center">
          <h3 className="modal-header-title">Add Playlist</h3>
          <span className="modal-close" onClick={viewhandler}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <input
            name="name"
            className="addplaylist width-100"
            value={name}
            onChange={changeHandler}
            placeholder="playlist name"
          />
          <textarea
            name="description"
            value={description}
            onChange={changeHandler}
            placeholder="playlist Description"
          ></textarea>
        </div>
        <div className="modal-footer text-center">
          <button className="btn btn-primary width-30" onClick={addHandler}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
