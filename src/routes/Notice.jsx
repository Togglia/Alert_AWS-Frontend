import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState, userNicknameAtom } from "../atoms";
import { useNavigate } from "react-router-dom";
import GoBackLink from "../components/GoBackLink";
import LogOutBtn from "../components/LogOutBtn";
import NameChecker from "../components/NameChecker";
import axios from "axios";
import BurgerMenu from "../components/BurgerMenu";

const Page = styled.div`
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

const BurgerMenuContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const NavBar = styled.nav`
  height: 10vh;
  position: fixed;
  width: 100%;
  background-color: #0a172a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;
  z-index: 999;

  h3 {
    color: white;
    font-size: 30px;
    opacity: 1 !important; /* !important를 속성 값 뒤에 추가 */
  }
`;

const Container = styled.div`
  position: absolute;
  top: 10vh; /* NavBar 아래부터 시작 */
  width: 100%;
  bottom: 0; /* 화면 아래까지 높이 설정 */
  background-color: transparent;
  display: flex;
  flex-direction: column; /* 기본적으로 가로로 배치 */
  align-items: center;

  /* @media (max-width: 768px) {
    flex-direction: column; /* 화면 크기가 768px 이하일 때 세로로 배치 
    height: 150vh;
  } */
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  h2 {
    display: block;
    margin: 0px 10px;
    margin-bottom: 10px;
    color: black;
    font-weight: 500;
    font-size: 26px;
    color: whitesmoke;
  }
`;

const ListContainer = styled.div`
  margin: 30px 0px;
  width: 80vw;
  height: 90vh;
  background-color: transparent;
  border: 2px solid cornflowerblue;
  border-radius: 20px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.12);
`;
const List = styled.ul`
  list-style: none;
  padding: 0; /* padding을 0으로 설정 */
`;

const ListItem = styled(motion.li)`
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: white;
  margin-top: 15px;
  width: 100%;
  padding: 20px 15px;
  border-radius: 5px;
  font-size: 16px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }

  a {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: black;
  }

  span {
    font-size: 14px;
    color: gray;
  }
`;

const NewPost = styled.div`
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-decoration: none;
  a {
    color: black;
  }
`;

const Notice = () => {
  const [boardList, setBoardList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserNickname("");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/notice-list"
        );
        setBoardList(response.data.data); // 수정: response.data.data를 사용하여 게시물 데이터를 가져옵니다.
      } catch (error) {
        console.error("공지사항 목록을 불러오는 중 오류 발생: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Page>
      <NavBar>
        <BurgerMenuContainer>
          <BurgerMenu />
        </BurgerMenuContainer>
        <h3>공지사항</h3>
        <NameChecker />
        <LogOutBtn>Log out</LogOutBtn>
      </NavBar>
      <Container>
        <ListContainer>
          <Info>
            <div>
              <h2>제목</h2>
            </div>
            <div>
              <h2>작성자</h2>
            </div>
          </Info>
          <List>
            {boardList.map((board) => (
              <ListItem key={board.id}>
                <Link to={`/boards/${board.id}`}>
                  {board.title} <span>{board.writer}</span>
                </Link>
              </ListItem>
            ))}
          </List>
        </ListContainer>

        <NewPost>
          <Link to="/create-notice">공지 작성</Link>
        </NewPost>
      </Container>
    </Page>
  );
};

export default Notice;
