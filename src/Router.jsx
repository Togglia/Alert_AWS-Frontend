import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./routes/Intro";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "./atoms";
import Signup from "./routes/Signup";

function Router() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <BrowserRouter>
      <Routes>
        

        <Route path="/intro/signup" element={<Signup />} />
        <Route path="/" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

// home도 isloggedin이 false면 login페이지로 이동하게 수정
