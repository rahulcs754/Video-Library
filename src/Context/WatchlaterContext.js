import { createContext, useContext, useReducer } from "react";
import { WatchlistReducer } from "../Reducer/WatchlistReducer";
const WatchlaterContext = createContext();

const intialValues = {
  watchLater: [],
  loading: false,
  error: "",
};

const WatchlistProvider = ({ children }) => {
  const [watchLaterState, watchLaterDispatch] = useReducer(
    WatchlistReducer,
    intialValues
  );

  return (
    <WatchlaterContext.Provider value={{ watchLaterState, watchLaterDispatch }}>
      {children}
    </WatchlaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchlaterContext);

export { useWatchLater, WatchlistProvider };
