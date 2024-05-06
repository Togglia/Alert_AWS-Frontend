import React, { useState, useEffect } from "react";

const NoticeList = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    // 게시물 목록을 백엔드 API로부터 가져와 상태를 업데이트
    fetch("http://localhost:4000/api/notice-list")
      .then((response) => response.json())
      .then((data) => {
        setBoardList(data);
      })
      .catch((error) => {
        console.error("공지사항 목록을 불러오는 중 오류 발생: ", error);
      });
  }, []);

  return (
    <div>
      <h1>공지사항 목록</h1>
      <ul>
        {boardList.map((board) => (
          <li key={board.id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
