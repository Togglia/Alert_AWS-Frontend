import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* 전체 화면 백그라운드 스타일 설정 */
  background-size: 100% 100%;
  background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px,
    0px 0px, 0px 0px;
  background-image: radial-gradient(
      70% 53% at 36% 76%,
      #000000f5 0%,
      #073aff00 100%
    ),
    radial-gradient(42% 53% at 15% 94%, #000000f5 7%, #073aff00 100%),
    radial-gradient(42% 53% at 34% 72%, #903df4f5 7%, #073aff00 100%),
    radial-gradient(18% 28% at 35% 87%, #000000f5 7%, #073aff00 100%),
    radial-gradient(31% 43% at 7% 98%, #0f0f17f5 24%, #073aff00 100%),
    radial-gradient(35% 56% at 91% 74%, #0e0c55f5 9%, #073aff00 100%),
    radial-gradient(74% 86% at 67% 38%, #000000f5 24%, #073aff00 100%),
    linear-gradient(181deg, #085877ff 1%, #4c00fcff 100%);
`;

const Container = styled.div`
  padding: 20px 30px;
  border-radius: 15px;
  background-color: white;
  height: 600px;
  width: 500px;
`;

const Header = styled.header`
  margin-bottom: 20px;
  margin-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: black;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    color: black;
    width: 60%;
    opacity: 0.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  a {
    font-size: 18px;
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 10px 0px;
    background-color: #9b75f3;
    color: white;
    border-radius: 5px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 15px 0px;
  font-size: 18px;
  margin-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: ${(props) => props.theme.accentColor};
  }

  &[type="submit"] {
    background-color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    padding: 20px 0px;
    border-radius: 5px;
    color: white;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userPasswordcheck, setPasswordCheck] = useState("");
  const [userNickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (userEmail) => {
    // 이메일 형식을 검증하는 정규 표현식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(userEmail);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isEmailValid(userEmail)) {
      setError("이메일 형식이 아닙니다.");
      return;
    }

    if (userPassword !== userPasswordcheck) {
      setError("Password and PasswordCheck should be same.");
      return;
    }

    try {
      //임시 코드, email과 password가 포함된 POST 요청을 백엔드로 보냄

      /*
      //실패 확인용 더미 코드
      const response = {
        result: false,
        message: "이미 등록된 닉네임입니다!",
        data: null,
      };  
      console.log(response.result);
       */

      /*
      //성공 확인용 더미 코드
      const response = {
        result: true,
        message: "회원가입 성공!",
        data: null,
      };  
      console.log(response.result);
       */

      const response = await axios.post(
        "http://localhost:4000/api/auth/signUp",
        {
          userEmail,
          userPassword,
          userPasswordcheck,
          userNickname,
        }
      );

      console.log(response.result);
      //회원가입 실패시 handleSignup함수 탈출, 에러내용 변경
      if (response.result === false) {
        setError(response.message);
        console.log("회원가입 실패 :", error);
        return;
      }

      // 회원가입 성공 시 리다이렉트
      console.log("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <Page>
      <Container>
        <Header>
          <h1>Sign up</h1>
          <p>Use Email or Google ID to make Account</p>
        </Header>
        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="passwordCheck"
            value={userPasswordcheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <Input
            type="nickname"
            placeholder="Nickname"
            value={userNickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input type="submit" value="Sign up" />
          {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}
        </Form>
      </Container>
    </Page>
  );
};

export default Signup;
