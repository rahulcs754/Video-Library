import { createContext, useContext, useReducer } from "react";
import { PlaylistReducer } from "../Reducer";
import { useAuthData } from "./AuthContext";
import { getPlaylist } from "../ApiService";
import { useEffect } from "react";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const {
    userAuth: { encodedToken },
  } = useAuthData();

  const IntialValue = {
    playlists: [],
    loading: false,
    error: false,
    errMsg: "",
  };

  const [playlistState, playlistDispatch] = useReducer(
    PlaylistReducer,
    IntialValue
  );

  // get playlist data from api
  useEffect(() => {
    (async () => {
      const localEncodedToken = localStorage.getItem("encodedToken");
      const { playlists, status } = await getPlaylist(localEncodedToken);

      if (status === 200 || status === 201) {
        playlistDispatch({
          type: "ADD_TO_PLAYLIST",
          payload: playlists,
        });
      } else {
        playlistDispatch({
          type: "ERROR_SET",
          errMsg: "Fail Error",
          error: true,
        });
      }
    })();
  }, []);

  return (
    <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };
