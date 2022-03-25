//import Product from "../Product/Product";
import { useVideo } from "../../../Context/VideoContext";
export const VideoList = () => {
  const { VideoState } = useVideo();
  const { data: ListOFVideo } = VideoState;
  return (
    <div className="col-10 col-md-10 col-lg-10 ml-l mt-l">
      <div className="flex flex-row flex-center gap-sm product_list_container">
        {ListOFVideo &&
          ListOFVideo.map(({ title, thumnailMedium }) => {
            const titleSet =
              title.length > 30 ? title.slice(0, 30) + "..." : title;
            return (
              <>
                <div className="card card-overlay">
                  <img
                    src={thumnailMedium.url}
                    className="card-image img-c"
                    alt="Card-Image"
                  />

                  <div className="card-header">
                    <div className="card-title video_title">{titleSet}</div>
                  </div>
                  <div className="card-info">
                    <p>345 views</p>
                    <p>33 likes</p>
                  </div>
                  <div className="card-footer ">
                    <button className={`btn btn-primary`}>
                      <i className="fas fa-shopping-cart mr-s" />
                      Watch Later
                    </button>
                    <i class="fa fa-thumbs-up"></i>
                    <i class="fa fa-thumbs-down"></i>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};