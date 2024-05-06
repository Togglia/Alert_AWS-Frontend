import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
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

const FormContainer = styled.div`
  margin-top: 10vh;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 80vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 30vh;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  display: flexbox;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: black;
`;

const Content = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UpdateButton = styled.button`
  background-color: #3300ff;
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

const NoticeUpdate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { boardId } = useParams();

  const userNickname = localStorage.getItem("userNickname");

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/notice-detail/${boardId}`
        );
        const { title, content } = response.data.data;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("게시물 상세 정보를 불러오는 중 오류 발생: ", error);
      }
    };

    fetchBoardDetail();
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await axios.put(
        `http://localhost:4000/api/notice-board`,
        {
          id: boardId,
          title: title,
          content: content,
          writer: userNickname,
        }
      );
      if (response.status === 204) {
        alert("수정 완료");
        navigate(`/notice`);
      } else {
        alert("공지사항 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("공지사항을 업데이트하는 중 오류 발생: ", error);
      alert("공지사항을 업데이트하는 중 오류 발생");
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>공지사항 수정</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="content">내용</Label>
          <Content
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />
          <ButtonWrapper>
            <UpdateButton type="submit">수정 완료</UpdateButton>
          </ButtonWrapper>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default NoticeUpdate;
