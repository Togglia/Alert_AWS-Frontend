import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, userNicknameAtom } from "../atoms";

const Name = styled.div`
  position: absolute;
  padding: 10px 20px;
  right: 130px;
  display: block;
  top: 15px;
  span {
    font-size: 26px;
    color: white;
  }
  h4 {
    color: white;
    font-size: 30px;
  }
`;

const NameChecker = () => {
  const recoilName = useRecoilValue(userNicknameAtom);
  const localName = localStorage.getItem("userNickname");

  return (
    <div>
      <div>
        {/* <span>recoil name </span> */}
        <Name>
          <span>{recoilName}</span>
        </Name>
      </div>
      {/* <div>
        <span>local name </span>
        <Name>{localName}</Name>
      </div> */}
    </div>
  );
};

export default NameChecker;
