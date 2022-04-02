import axios from "axios";
import { toast } from "react-toastify";
export const clearHistory = async (token, HistoryDispatch) => {
  try {
    const {
      data: { history },
      status,
    } = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: token,
      },
    });

    if (status === 200 || status === 201) {
      HistoryDispatch({ type: "SET_HISTORY", payload: history });
      toast.warning("Clear all video from history list", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    return { error: 1, msg: error };
  }
};
