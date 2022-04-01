import { SinglePlaylist } from "./SinglePlaylist";
import { usePlaylist } from "../../../Context";
export const Playlist = () => {
  // using context
  const {
    playlistState: { playlists },
  } = usePlaylist();

  return (
    <div className="playlist">
      {playlists &&
        playlists.map((item, i) => {
          return <SinglePlaylist {...item} key={i} />;
        })}
    </div>
  );
};
