import { useHistory, useAuthData } from "../../Context";
import { removeHistory, clearHistory } from "../../ApiService";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const History = () => {
  const navigate = useNavigate();

  const {
    userAuth: { isUserLoggedIn },
  } = useAuthData();

  const {
    HistoryState: { history },
    HistoryDispatch,
  } = useHistory();

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  const removeHandler = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const { history, status } = await removeHistory(id, token);
    if (status === 200 || status === 201) {
      HistoryDispatch({ type: "SET_HISTORY", payload: history });
      toast.warning("Remove video from history list");
    }
  };

  const clearHandler = async () => {
    const token = localStorage.getItem("encodedToken");
    const { history, status } = await clearHistory(token, HistoryDispatch);
  };

  return (
    <>
      <div className="grid-container m-m">
        <div className="space-between align-item">
          <strong className="mr-m ">History: {history.length}</strong>
          <button className="btn btn-primary" onClick={clearHandler}>
            Clear History
          </button>
        </div>
      </div>

      <div className="flex flex-row m-m">
        {history.length > 0 ? (
          history.map((item) => {
            const { _id, title, videoId, thumnailMedium } = item;
            return (
              <div className="card card-overlay video_card" key={_id}>
                <Link to={`/watch/${videoId}`}>
                  <img
                    src={thumnailMedium.url}
                    className="card-image video_image"
                    alt="Card-Image"
                  />
                </Link>
                <div className="card-header">
                  <div className="card-title video_title space-between  align-item">
                    <span className="text_ellipsis">{title}</span>
                    <i
                      className="far fa-trash pointer"
                      onClick={() => removeHandler(_id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-row margin-auto">
            <span className="f-m">You've seen 0 of our videos</span>
          </div>
        )}
      </div>
    </>
  );
};
