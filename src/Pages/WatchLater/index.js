import { useWatchLater, useAuthData } from "../../Context";
import { VideoCart } from "./VideoCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const WatchLater = () => {
  const navigate = useNavigate();
  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();
  const {
    watchLaterState: { watchlater },
  } = useWatchLater();

  return (
    <>
      <div className="grid-container m-m">
        <div className="space-between">
          <strong className="mr-m">
            Watch later Videos: {watchlater.length}
          </strong>
        </div>
      </div>

      <div className="flex flex-row m-m">
        {watchlater !== 0 &&
          watchlater.map((item, i) => {
            return <VideoCart {...item} key={i} />;
          })}
      </div>
    </>
  );
};
