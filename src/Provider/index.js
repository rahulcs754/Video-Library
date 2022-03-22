import { VideoProvider } from "../Context/VideoContext";
const AllProvider = ({ children }) => {
  return <VideoProvider>{children}</VideoProvider>;
};

export default AllProvider;
