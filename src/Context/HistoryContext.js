import { createContext, useContext, useReducer } from "react";
import { likedReducer } from "../Reducer/LikedReducer";
const historyContext = createContext();

const intialValues = {
  history: [],
  loading: false,
  error: "",
};

const historyReducer = (state, action) => {
  switch (action.type) {
    case "SET_HISTORY":
      return {
        ...state,
        history: action.payload,
      };

    default:
      return state;
  }
};

const HistoryProvider = ({ children }) => {
  const [HistoryState, HistoryDispatch] = useReducer(
    historyReducer,
    intialValues
  );

  return (
    <historyContext.Provider value={{ HistoryState, HistoryDispatch }}>
      {children}
    </historyContext.Provider>
  );
};

const useHistory = () => useContext(historyContext);

export { useHistory, HistoryProvider };
