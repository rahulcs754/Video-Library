import { useVideo } from "../../../Context/VideoContext";
import { Link } from "react-router-dom";
export const Category = () => {
  const { VideoState } = useVideo();
  const { videoCategory } = VideoState;
  console.log(VideoState);
  return (
    <>
      <div className="rs-row m-l">
        <div className="col-sm-12 text-left">
          <span className="section_heading">CATEGORY</span>
        </div>
      </div>
      <div className="rs-row m-l">
        <div className="col-sm-12 flex flex-row flex-center flex-grow gap-md">
          {videoCategory.map(({ linkCategory, image }, i) => {
            return (
              <div className="col-sm-3 pointer" key={i}>
                <div className="card card-shadow img-square ">
                  <Link to={linkCategory}>
                    <img
                      src={image}
                      className="card-image img-lg"
                      alt="Card-Image"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
