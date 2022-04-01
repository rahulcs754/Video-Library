import Routespaths from "./Routers";
import { Header } from "./Components/Header";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Header />
      <Routespaths />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
