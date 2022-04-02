import { useVideo } from "../../../Context";
import { VideoCartFooter } from "./VideoCartFooter";
import { useParams } from "react-router-dom";
export const VideoList = () => {
  const { VideoState } = useVideo();
  const { data: ListOFVideo } = VideoState;
  const { category } = useParams();

  let filterCategoryWise =
    category === "all"
      ? ListOFVideo
      : ListOFVideo.filter((item) => item.category === category);
  return (
    <>
      <div className="col-10 col-md-10 col-lg-10 ml-l mt-l">
        <div className="flex flex-row flex-center gap-sm product_list_container">
          {filterCategoryWise &&
            filterCategoryWise.map((item, i) => {
              const { title, likes, views, thumnailMedium } = item;

              return (
                <div className="card card-overlay" key={i}>
                  <img
                    src={thumnailMedium.url}
                    className="card-image img-c"
                    alt="Card-Image"
                  />

                  <div className="card-header">
                    <div className="card-title video_title text_ellipsis">
                      {title}
                    </div>
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
