import { useVideo } from "../../../Context";
import { VideoCartFooter } from "./VideoCartFooter";
export const VideoList = () => {
  const { VideoState } = useVideo();
  const { data: ListOFVideo } = VideoState;

  return (
    <>
      <div className="col-10 col-md-10 col-lg-10 ml-l mt-l">
        <div className="flex flex-row flex-center gap-sm product_list_container">
          {ListOFVideo &&
            ListOFVideo.map((item, i) => {
              const { title, likes, views, thumnailMedium } = item;

              const titleSet =
                title.length > 30 ? title.slice(0, 30) + "..." : title;

              return (
                <div className="card card-overlay" key={i}>
                  <img
                    src={thumnailMedium.url}
                    className="card-image img-c"
                    alt="Card-Image"
                  />

                  <div className="card-header">
                    <div className="card-title video_title">{titleSet}</div>
                  </div>
                  <div className="card-info">
                    <p>{views} views</p>
                    <p>{likes} likes</p>
                  </div>
                  <div className="card-footer ">
                    <VideoCartFooter {...item} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
