import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { addPlaylist } from "../../../ApiService";
import { usePlaylist } from "../../../Context";

export const AddplaylistForm = ({ setViewInput }) => {
  const [playlistFormInput, setPlaylistFormInput] = useState({
    name: "",
    description: "",
  });

  const { name, description } = playlistFormInput;
  const { playlistState, playlistDispatch } = usePlaylist();

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

    const encodeToken = localStorage.getItem("encodedToken");
    const res = await addPlaylist(newplaylist, encodeToken);
    console.log(res);
    if (res.status === 201 || res.status === 200) {
      playlistDispatch({
        type: "ADD_PLAYLIST",
        payload: newplaylist,
      });
      setViewInput((prev) => !prev);
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
