import {
  VideoProvider,
  AuthProvider,
  WatchlistProvider,
  PlaylistProvider,
  LikedProvider,
} from "../Context";
const AllProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>
        <PlaylistProvider>
          <LikedProvider>
            <WatchlistProvider>{children}</WatchlistProvider>
          </LikedProvider>
        </PlaylistProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default AllProvider;
