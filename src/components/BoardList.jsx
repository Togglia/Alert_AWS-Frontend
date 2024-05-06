import React, { useState, useEffect } from "react";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    // 게시물 목록을 백엔드 API로부터 가져와 상태를 업데이트
    fetch("http://localhost:4000/api/board-list")
      .then((response) => response.json())
      .then((data) => {
        setBoardList(data);
      })
      .catch((error) => {
        console.error("게시물 목록을 불러오는 중 오류 발생: ", error);
      });
  }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 componentDidMount와 동일한 동작을 시뮬레이션

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {boardList.map((board) => (
          <li key={board.id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
