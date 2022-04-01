import {
  VideoProvider,
  AuthProvider,
  WatchlistProvider,
  PlaylistProvider,
} from "../Context";
const AllProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>
        <PlaylistProvider>
          <WatchlistProvider>{children}</WatchlistProvider>
        </PlaylistProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default AllProvider;
