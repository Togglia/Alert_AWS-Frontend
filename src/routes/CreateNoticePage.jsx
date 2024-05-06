import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNicknameAtom } from "../atoms";
import { Link } from "react-router-dom";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

const FormContainer = styled.div`
  margin-top: 10vh;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 80vh;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  display: flexbox;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 30vh;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #3300ff;
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

const FileInput = styled.input`
  display: none;
`;
// CustomFileInput의 스타일 수정
const CustomFileInput = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100%;
  border: dotted 1px solid black;
  background-color: black;
  border: 7px dotted white;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  height: 15vh;
  cursor: pointer;
  font-size: 16px;
  display: inline-block;
  text-align: center;
  div {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const GoBackLink = styled(Link)`
  text-decoration: none;
  color: #4a05d2;
  font-size: 16px;
  margin-top: 10px;
`;

const CreateNoticePage = () => {
  const navigate = useNavigate();
  const getUserNickname = useRecoilValue(userNicknameAtom);
  const setUserNickname = useSetRecoilState(userNicknameAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("파일 선택");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("파일 선택");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    const userNickname = localStorage.getItem("userNickname");
    setUserNickname(userNickname);

    const writer = userNickname;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", writer);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-notice",
        {
          title,
          content,
          writer,
        }
      );

      if (response.status === 201) {
        alert("게시물이 작성되었습니다.");
        navigate("/notice");
      } else {
        alert("게시물 작성에 실패했습니다.");
      }
    } catch (error) {
      alert("게시물 작성에 실패했습니다.");
      console.error("게시물 작성 중 오류 발생: ", error);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>공지사항 작성</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />

          <Label></Label>
          <FileInput
            type="file"
            id="photo"
            onChange={handleFileChange}
            accept=".jpg"
          />
          <CustomFileInput htmlFor="photo">
            <div>
              <span>{selectedFileName}</span>
            </div>
          </CustomFileInput>
          <ButtonWrapper>
            <Button type="submit">작성 완료</Button>
          </ButtonWrapper>
        </form>
        {/* <GoBackLink to="/boards">돌아가기</GoBackLink> */}
      </FormContainer>
    </PageContainer>
  );
};

export default CreateNoticePage;
