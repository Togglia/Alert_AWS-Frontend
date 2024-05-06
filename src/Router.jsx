import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./routes/Intro";
import Home from "./routes/Home";
import MyPage from "./routes/MyPage";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "./atoms";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Boards from "./routes/Boards";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";
import CreateBoardPage from "./routes/CreateBoardPage";
import BoardUpdate from "./routes/BoardUpdate";
import UploadVideo from "./routes/UploadVideo";
import Notice from "./routes/Notice";
import NoticeDetail from "./components/NoticeDetail";
import NoticeUpdate from "./routes/NoticeUpdate";
import CreateNoticePage from "./routes/CreateNoticePage";

function Router() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/boards"
          element={isLoggedIn ? <Boards /> : <Navigate to="/login" />}
        />
        <Route
          path="/boards/:boardId"
          element={isLoggedIn ? <BoardDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-board/:boardId"
          element={isLoggedIn ? <BoardUpdate /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-board"
          element={isLoggedIn ? <CreateBoardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/notice"
          element={isLoggedIn ? <Notice /> : <Navigate to="/login" />}
        />
        <Route
          path="/notice/:boardId"
          element={isLoggedIn ? <NoticeDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-notice/:boardId"
          element={isLoggedIn ? <NoticeUpdate /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-notice"
          element={isLoggedIn ? <CreateNoticePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/mypage"
          element={isLoggedIn ? <MyPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

// home도 isloggedin이 false면 login페이지로 이동하게 수정
