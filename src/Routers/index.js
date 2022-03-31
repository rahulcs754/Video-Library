import {
  Home,
  History,
  Login,
  Signup,
  Videos,
  WatchLater,
  NoPageFound,
} from "../Pages";
import MockAPI from "../mock-api";

import { Routes, Route } from "react-router-dom";

const Routespaths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/history" element={<History />}></Route>
      <Route path="/explore" element={<Videos />}></Route>
      <Route path="/watchlater" element={<WatchLater />}></Route>
      <Route path="/mock-api" element={<MockAPI />}></Route>
      <Route path="*" element={<NoPageFound />}></Route>
    </Routes>
  );
};

export default Routespaths;
