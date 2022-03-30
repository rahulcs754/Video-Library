import { useLike, useAuthData } from "../../Context";
import { VideoCart } from "./VideoCart";
import { useNavigate } from "react-router-dom";
export const Liked = () => {
  const navigate = useNavigate();
  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();
  const {
    LikeState: { liked },
  } = useLike();

  if (isUserLoggedIn === false) {
    navigate("/login");
  }

  return (
    <>
      <div className="grid-container m-m">
        <div className="space-between">
          <strong className="mr-m">Liked Videos: {liked.length}</strong>
        </div>
      </div>

      <div className="flex flex-row m-m">
        {liked &&
          liked.map((item) => {
            return <VideoCart {...item} />;
          })}
      </div>
    </>
  );
};
