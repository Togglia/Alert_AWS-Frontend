import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RiCloseCircleLine, RiToolsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNicknameAtom } from "../atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoBackLink = styled(Link)`
  background-color: #4a05d2;
  text-decoration: none;
  color: white;
  font-size: 16px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
`;

const LinkBox = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 5px;
`;

const Icon = styled.span`
  font-size: 28px;
  color: #4a05d2;
`;

const CloseButton = styled.button`
  top: 15px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
`;

const UpdateButton = styled.button`
  top: 15px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
`;

const BackBoard = styled.div`
  width: 90vw;
  background-color: white;
  padding: 30px 40px;
  border-radius: 10px;
  height: 60vh;
  max-width: 1000px;
`;

const Container = styled.div``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  border-bottom: 1px solid #000;
  h2 {
    color: black;
    font-weight: 500;
    font-size: 18px;
  }

  margin-top: 5px;
  padding-bottom: 15px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  color: black;
`;
const Img = styled.img`
  width: 250px; /* 이미지 폭을 300px로 고정 */
  height: 250px; /* 이미지 높이를 300px로 고정 */
  background-color: aliceblue;
  object-fit: cover; /* 이 줄을 추가하여 이미지의 가로세로 비율 유지 */

  @media (max-width: 768px) {
    width: 200px; /* 화면 폭이 768px 이하인 경우에도 이미지 크기를 300x300으로 유지 */
    height: 200px;
  }
`;
const ContentContainer = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentText = styled.span`
  color: black;
  margin-top: 0;
  font-size: 24px;
`;

const ImgContainer = styled.div`
  width: 250px;
  height: 250px;
  background-color: aliceblue;
  margin-right: 30px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid #000;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const Writer = styled.h1`
  color: gray;
  font-size: 20px;
  top: 0;
`;

const NoticeDetail = () => {
  // useParams 훅을 사용하여 URL 파라미터를 읽어옵니다.
  const { boardId } = useParams();
  const userNickname = useRecoilValue(userNicknameAtom);
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/notice-detail/${boardId}`
        );
        setBoard(response.data.data);
      } catch (error) {
        console.error("공지사항 상세 정보를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchBoardDetail();
  }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/delete-notice", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: board.id }),
      });
      console.log(response);
      if (response.ok) {
        navigate("/notice");
      } else {
        const data = await response.json();

        if (data.error === "NotAuthorized") {
          alert("작성자가 아닙니다.");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleUpdate = () => {
    navigate(`/update-notice/${boardId}`); // 수정 페이지로 이동
  };

  return (
    <Page>
      <Container>
        <BackBoard>
          <div>
            <Info>
              <Title>{board.title}</Title>
              <Writer> {board.writer}</Writer>
            </Info>
            <ContentBox>
              <ImgContainer>
                {board.img ? (
                  <Img
                    src="data:image/jpeg;base64,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"
                    alt="Earth"
                  />
                ) : null}
              </ImgContainer>
              <ContentContainer>
                <ContentText>{board.content}</ContentText>
              </ContentContainer>
            </ContentBox>
          </div>
          <LinkBox>
            <GoBackLink to="/boards">돌아가기</GoBackLink>

            <UpdateButton
              onClick={
                userNickname == board.writer
                  ? handleUpdate
                  : () => alert("작성자가 아닙니다.")
              }
            >
              <Icon>
                <RiToolsFill />
              </Icon>
            </UpdateButton>

            <CloseButton
              onClick={
                userNickname == board.writer
                  ? handleDelete
                  : () => alert("작성자가 아닙니다.")
              }
            >
              <Icon>
                <RiCloseCircleLine />
              </Icon>
            </CloseButton>
          </LinkBox>
        </BackBoard>
      </Container>
    </Page>
  );
};

export default NoticeDetail;
