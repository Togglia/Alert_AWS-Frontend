import React, { useEffect, useState } from "react";

const KakaoMap = () => {
  const [carsPerMinIndex, setCarsPerMinIndex] = useState(0);

  useEffect(() => {
    const loadMap = () => {
      if (window.kakao) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 9,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 이하 부분은 지도 위에 마커를 추가하는 코드 등이 들어갈 수 있습니다.
      }
    };

    loadMap();
  }, [carsPerMinIndex]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default KakaoMap;
