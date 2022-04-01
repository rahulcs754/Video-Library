import { PlaylistTitle } from "./PlaylistTitle";
import { VideoCart } from "./VideoCart";
import { useVideo } from "../../../Context";
export const SinglePlaylist = (item) => {
  const { videos } = item;
  const {
    VideoState: { data },
  } = useVideo();
  return (
    <div className="playlist_container">
      <PlaylistTitle {...item} />
      <div className="flex flex-row mt-s">
        {videos &&
          videos.map((video, i) => {
            const findVideo = data.find((item) => item._id == video);

            return <VideoCart {...findVideo} playlistId={item._id} key={i} />;
          })}
      </div>
    </div>
  );
};
