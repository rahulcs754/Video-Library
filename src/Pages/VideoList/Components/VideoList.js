import { useVideo, useHistory } from "../../../Context";
import { VideoCartFooter } from "./VideoCartFooter";
import { addHistory } from "../../../ApiService";
import { useParams, useNavigate } from "react-router-dom";

export const VideoList = () => {
  const { VideoState } = useVideo();
  const { HistoryDispatch } = useHistory();
  const { data: ListOFVideo } = VideoState;
  const { category } = useParams();
  const navigate = useNavigate();

  const addHistoryHandler = async (item) => {
    navigate(`/watch/${item._id}`);
    const encodeToken = localStorage.getItem("encodedToken");

    const { history, status } = await addHistory(item, encodeToken);

    if (status === 200 || status === 201) {
      HistoryDispatch({ type: "SET_HISTORY", payload: history });
    }
  };

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
              const { _id, title, likes, views, thumnailMedium } = item;

              return (
                <div className="card card-overlay" key={_id}>
                  <button onClick={() => addHistoryHandler(item)}>
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
                  </button>
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
