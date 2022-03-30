import { SinglePlaylist } from "./SinglePlaylist";
//import { usePlaylist } from "../../../Context";
import { getPlaylist } from "../../../ApiService";
import { useEffect, useState } from "react";
export const Playlist = () => {
  //access playlist context
  const [playPlaylistData, setPlaylistdata] = useState([]);

  // using context
  /*const {
    playlistState: { playlists },
  } = usePlaylist();*/

  useEffect(() => {
    (async () => {
      const encodeToken = localStorage.getItem("encodedToken");
      const { playlists, status } = await getPlaylist(encodeToken);
      if (status === 200 || status === 201) {
        setPlaylistdata(playlists);
      }
    })();
  }, [playPlaylistData]);

  return (
    <div className="playlist">
      {playPlaylistData &&
        playPlaylistData.map((item, i) => {
          return <SinglePlaylist {...item} key={i} />;
        })}
    </div>
  );
};
