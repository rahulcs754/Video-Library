import { useState } from "react";
import { Playlist } from "./Components/Playlist";
import { AddplaylistForm } from "./Components/AddplaylistForm";
import { usePlaylist } from "../../Context";

export const Playlists = () => {
  const [viewInput, setViewInput] = useState(false);
  //access playlist context
  const {
    playlistState: { playlists },
  } = usePlaylist();

  return (
    <>
      <div className="flex flex-row space-between align-item m-m">
        <h3>All Playlists ( {playlists ? playlists.length : 0} Playlists )</h3>
        <div>
          {viewInput ? (
            <AddplaylistForm
              viewInput={viewInput}
              setViewInput={setViewInput}
            />
          ) : null}

          <button
            className="btn btn-primary"
            onClick={() => setViewInput((prev) => !prev.viewInput)}
          >
            + Add Playlist
          </button>
        </div>
      </div>

      <Playlist />
    </>
  );
};
