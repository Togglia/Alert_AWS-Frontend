import React, { useEffect, useState } from "react";
const { kakao } = window;

const KakaoMap = () => {
  const [carsPerMinArray, setCarsPerMinArray] = useState(Array(20).fill(0));
  const [carsPerMinIndex, setCarsPerMinIndex] = useState(0);
  const MeanArray = [
    60, 86, 69, 30, 44, 54, 70, 70, 90, 72, 11, 19, 72, 92, 36, 66, 45, 36, 43,
    30,
  ];
  const bridges = [
    
  ];

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 9,
    };
    const map = new kakao.maps.Map(container, options);

    const bridgeMarkers = bridges.map((bridge) => {
      const markerPosition = new kakao.maps.LatLng(
        bridge.latitude,
        bridge.longitude
      );

      const imageSize = new kakao.maps.Size(40, 40);
      const imageOption = { offset: new kakao.maps.Point(20, 40) };

      const redMarkerImage = new kakao.maps.MarkerImage(
        process.env.PUBLIC_URL + "/Img/red.png",
        imageSize,
        imageOption
      );

      const blueMarkerImage = new kakao.maps.MarkerImage(
        process.env.PUBLIC_URL + "/Img/blue.png",
        imageSize,
        imageOption
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map,
        title: bridge.name,
        image: redMarkerImage, // 기본적으로 빨간색 마커로 설정
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width: auto; height: auto; padding: 10px; font-size: 14px; color: black;">${bridge.name}</div>`,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      return { marker, bridge, redMarkerImage, blueMarkerImage };
    });

    const updateMarkers = () => {
      bridgeMarkers.forEach(
        ({ marker, bridge, redMarkerImage, blueMarkerImage }) => {
          const bridgeMean = bridge.mean;
          const carsPerMin = bridge.cars_per_min[carsPerMinIndex];

          const newMarkerImage =
            carsPerMin !== undefined && carsPerMin > bridgeMean
              ? redMarkerImage
              : blueMarkerImage;

          marker.setImage(newMarkerImage);
        }
      );
    };

    updateMarkers();

    const interval = setInterval(() => {
      setCarsPerMinIndex((prevIndex) => (prevIndex + 1) % 8);
      updateMarkers();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
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
