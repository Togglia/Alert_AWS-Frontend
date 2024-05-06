import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoggedInState, userNicknameAtom } from "../atoms";
import { useNavigate } from "react-router-dom";

const LogOutButton = styled.button`
  background-color: #3a16cc;
  position: absolute;
  right: 30px;
  display: block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogOutBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Log out button click - clear local storage values
    setIsLoggedIn(false);
    setUserNickname("");
    localStorage.clear(); // Clear all stored data in localStorage
    navigate("/");
  };

  return <LogOutButton onClick={handleLogOut}>Log out</LogOutButton>;
};

export default LogOutBtn;
