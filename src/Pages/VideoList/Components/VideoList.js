import { useVideo } from "../../../Context";
import { VideoCartFooter } from "./VideoCartFooter";
import { Link } from "react-router-dom";
export const VideoList = () => {
  const { VideoState } = useVideo();
  const { data: ListOFVideo } = VideoState;

  return (
    <>
      <div className="col-10 col-md-10 col-lg-10 ml-l mt-l">
        <div className="flex flex-row flex-center gap-sm product_list_container">
          {ListOFVideo &&
            ListOFVideo.map((item, i) => {
              const { _id, title, likes, views, thumnailMedium } = item;

              return (
                <div className="card card-overlay" key={i}>
                  <Link to={`/watch/${_id}`}>
                    <img
                      src={thumnailMedium.url}
                      className="card-image img-c"
                      alt="Card-Image"
                    />

<<<<<<< HEAD
                    <div className="card-header">
                      <div className="card-title video_title">{titleSet}</div>
                    </div>
                  </Link>
=======
                  <div className="card-header">
                    <div className="card-title video_title text_ellipsis">
                      {title}
                    </div>
                  </div>
>>>>>>> 510aff6e088de93b0ff669416c6d1f85bf7486e6
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
