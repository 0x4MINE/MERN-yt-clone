import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Video from "./pages/Video";
import useAuth from "./store/useAuth";
import LoadingSpinner from "./componants/LoadingSpinner";
import { useEffect } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  const { isLoading, currentUser, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <Routes>
      <Route index element={<Home path={"/recommended"} />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="video/:id" element={<Video />} />
      <Route path="/subscribed" element={<Home path={"/subscribed"} />} />
      <Route path="/search" element={<Home />} />
      <Route path="/history" element={<Home path={"/history"} />} />
      <Route path="/trend" element={<Home path={"/trend"} />} />
    </Routes>
  );
}

export default App;
