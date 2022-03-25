import { VideoProvider } from "../Context/VideoContext";
import { AuthProvider } from "../Context/AuthContext";
const AllProvider = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>{children}</VideoProvider>
    </AuthProvider>
  );
};

export default AllProvider;
