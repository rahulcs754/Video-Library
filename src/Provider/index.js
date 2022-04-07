import {
  VideoProvider,
  AuthProvider,
  WatchlistProvider,
  PlaylistProvider,
  LikedProvider,
  HistoryProvider,
} from "../Context";
const AllProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>
        <PlaylistProvider>
          <LikedProvider>
            <WatchlistProvider>
              <HistoryProvider>{children}</HistoryProvider>
            </WatchlistProvider>
          </LikedProvider>
        </PlaylistProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default AllProvider;
