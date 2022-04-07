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

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="grid-container m-m">
        <div className="space-between">
          <strong className="mr-m">Watch Later: {watchlater.length}</strong>
        </div>
      </div>

      <div className="flex flex-row m-m">
        {watchlater.length > 0 ? (
          watchlater.map((item, i) => {
            return <VideoCart {...item} key={i} />;
          })
        ) : (
          <div className="flex flex-row margin-auto">
            <span className="f-m">You've not saved any video in this list</span>
          </div>
        )}
      </div>
    </>
  );
};
