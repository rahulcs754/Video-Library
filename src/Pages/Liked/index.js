import { useLike, useAuthData } from "../../Context";
import { VideoCart } from "./VideoCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Liked = () => {
  const navigate = useNavigate();
  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();
  const {
    LikeState: { liked },
  } = useLike();

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="grid-container m-m">
        <div className="space-between">
          <strong className="mr-m">Liked Videos: {liked.length}</strong>
        </div>
      </div>

      <div className="flex flex-row m-m">
        {liked.length > 0 ? (
          liked.map((item) => {
            return <VideoCart {...item} />;
          })
        ) : (
          <div className="flex flex-row margin-auto">
            <span className="f-m">You've liked 0 of our videos</span>
          </div>
        )}
      </div>
    </>
  );
};
