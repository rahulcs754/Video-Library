import { VideoProvider } from "../Context/VideoContext";
import { AuthProvider } from "../Context/AuthContext";
import { WatchlistProvider } from "../Context/WatchlaterContext";
const AllProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>
        <WatchlistProvider>{children}</WatchlistProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default AllProvider;
