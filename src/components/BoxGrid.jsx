import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { RiCloseCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { h3 } from "fontawesome";
const Wrapper = styled.div`
  margin-left: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 10px;
  padding: 10px;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const Icon = styled.span`
  font-size: 28px;
  color: white;
`;

const Box = styled(motion.div)`
  height: 80px;
  width: 80px;
  background-color: ${(props) => props.color || 'white'};
  border-radius: 8%;
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 박스 내용을 중앙에 정렬 */

  &:hover {
    transform: translateY(-3px) !important;
  }
`;

const Card = styled(motion.div)`
  margin-left: 30px;
  z-index: 100;
  position: absolute;
  top: 50;
  left: 0;
  width: 90%;
  height: 60%;
  padding: 30px;
  display: grid;
  grid-template-columns: 3fr;
  grid-template-rows: min-content 3fr;
  gap: 20px;
  background-color: white;
  background-image: linear-gradient(109.7deg, #4236ab 1.8%, #b15dc8 90.2%);

  div {
    margin-top: -10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
  video {
    width: 300px;
    height: 230px;
    @media (max-width: 768px) {
      height: 100px;
      width: 100px;
    }
  }
  p {
    width: 80%;
    display: inline-block
    text-align: justify;
    line-height: 125%;
    font-size: 1.3rem;
    white-space: pre-line;
  }
`;

const Video = styled.video`
  width: 150px;
  height: 150px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
`;

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.2,
    },
  },
};

const Count = styled.div`
  width: 500px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;


const BoxGrid = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [videoId, setBridgeId] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null); // 추가: Blob 데이터 상태
  const [currentCarsPerMin, setCurrentCarsPerMin] = useState([]);
  const [carsPerMinIndex, setCarsPerMinIndex] = useState(0);

  const [countArray, setCountArray] = useState([]);
  
  const bridges = [
    {
      id: 1,
      name: "일본",
      cars_per_min: [36, 147, 109, 62, 90, 123, 39],
      color: "#FFB6C1",
      mean: 60,
    },
    {
      id: 2,
      name: "중국",
      cars_per_min: [36, 147, 109, 62, 90, 123, 39],
      color: "#FFB6C1",
      mean: 86,
    },
    {
      id: 3,
      name: "튀르키예",
      cars_per_min: [69, 75, 47, 46, 118, 61, 68, 68],
      color: "#ADD8E6",
      mean: 69,
    },

    { id: 4, name: "영국", cars_per_min: [], color: "#ADD8E6",mean: 30 },
    {
      id: 5,
      name: "괌",
      cars_per_min: [51, 38, 38, 51, 38, 70, 24, 43],
      mean: 44,
    },
    {
      id: 6,
      name: "태국",
      cars_per_min: [35, 107, 63, 68, 39, 46, 49, 29],
      color: "#FFB6C1",
      mean: 54,
    },
    {
      id: 7,
      name: "베트남",
      cars_per_min: [72, 56, 27, 106, 94, 107, 78, 22],
      color: "#FFB6C1",
      mean: 70,
    },
    {
      id: 8,
      name: "스위스",
      cars_per_min: [19, 95, 35, 37, 184, 10, 92, 94],
      color: "#ADD8E6",
      mean: 70,
    },
    {
      id: 9,
      name: "이탈리아",
      cars_per_min: [35, 112, 41, 117, 150, 67, 126, 74],
      color: "#ADD8E6",
      mean: 90,
    },
    {
      id: 10,
      name: "사이판",
      cars_per_min: [55, 90, 103, 59, 23, 164, 51, 34],
      mean: 72,
    },
    {
      id: 11,
      name: "인도네시아",
      cars_per_min: [4, 16, 2, 22, 1, 24, 5, 15],
      color: "#FFB6C1",
      mean: 11,
    },
    {
      id: 12,
      name: "싱가포르",
      cars_per_min: [29, 24, 16, 13, 22, 15, 11, 26],
      color: "#FFB6C1",
      mean: 19,
    },
    {
      id: 13,
      name: "프랑스",
      cars_per_min: [82, 76, 65, 74, 68, 74, 69, 70],
      color: "#ADD8E6",
      mean: 72,
    },
    {
      id: 14,
      name: "독일",
      cars_per_min: [64, 74, 85, 97, 111, 131, 100],
      color: "#ADD8E6",
      mean: 92,
    },
    {
      id: 15,
      name: "호주",
      cars_per_min: [18, 68, 10, 50, 60, 8, 67, 11],
      mean: 36,
    },

    {
      id: 16,
      name: "몰디브",
      cars_per_min: [56, 60, 79, 57, 61, 63, 80, 74],
      color: "#FFB6C1",
      mean: 66,
    },
    {
      id: 17,
      name: "대만",
      cars_per_min: [42, 62, 42, 49, 48, 33, 54, 37],
      color: "#FFB6C1",
      mean: 45,
    },
    {
      id: 18,
      name: "체코",
      cars_per_min: [16, 36, 27, 41, 70, 25, 52, 26],
      color: "#ADD8E6",
      mean: 36,
    },
    {
      id: 19,
      name: "북유럽",
      cars_per_min: [57, 46, 28, 41, 50, 35, 59],
      color: "#ADD8E6",
      mean: 43,
    },
    { id: 20, 
      name: "미국캐나다", 
      cars_per_min: [], 
      mean: 30 },
  ];

  useEffect(() => {
    const generateCountArray = () => {
      const newCountArray = bridges.map((bridge) => {
        const currentArray = bridge.cars_per_min;
        return currentArray[carsPerMinIndex % 8]; // 8로 변경: 데이터 배열의 길이가 8임
      });
      setCountArray(newCountArray);
    };

    generateCountArray();

    const interval = setInterval(() => {
      setCarsPerMinIndex((prevIndex) => {
        if (prevIndex >= 7) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
      generateCountArray();
    }, 60000);

    return () => clearInterval(interval);
  }, [carsPerMinIndex, bridges]);

  //서버에 영상 요청
  useEffect(() => {
    if (selectedBox) {
      axios
        .get(`http://43.200.156.108:4000/api/videos/${videoId}/stream`, {
          responseType: "blob", // Blob 데이터 요청
        })
        .then((response) => {
          setVideoBlob(response.data); // Blob 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error("영상을 가져오기 실패.", error);
          setVideoBlob(null); // 영상을 가져오지 못하면 Blob 데이터 초기화
        });
    }
  }, [selectedBox]);

  useEffect(() => {
    if (selectedBox) {
      setCurrentCarsPerMin(
        bridges.find((bridge) => bridge.name === selectedBox).cars_per_min
      );
    }
  }, [selectedBox]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carsPerMinIndex >= 7) {
        setCarsPerMinIndex(0);
      } else {
        setCarsPerMinIndex(carsPerMinIndex + 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [carsPerMinIndex]);

  const [selectedBoxText, setSelectedBoxText] = useState("");
  const handleBoxClick = (name, id) => {
    setSelectedBox(name);
    setBridgeId(id);
    if (name==='일본')
    {
      setSelectedBoxText(`
      오사카/규슈 4일 
      #관서기행#훼리타고벚꽃구경
      
      오사카 대표관광지를 관광하고 오사카 중심에 위치한 호텔 숙박으로 저녁시간까지 알차게 보낼 수 있습니다.

      729,900원~
      `);
    }
    else if(name==='중국')
    {
      setSelectedBoxText(`
      북경/천진 3일 
      #핵심관광#만리장성#천안문#초특가필살기
      
      합리적인 가격으로 북경을 관광 하는 상품으로, 대표적인 필수관광지를 포함해 알찬 구성으로 이루어진 일정을 만나보세요.

      299,000원~
      `);
    }
    else if(name==='태국')
    {
      setSelectedBoxText(`
      방콕/파타야 5일 
      #방콕의재발견#5성호텔#타이마사지
      
      시내 중심 5성호텔+핫플레이스+이색체험으로, '새로운 방콕'을 발견하고 싶은 분께 추천드립니다.

      529,000원~
      `);
    }else if(name==='베트남')
    {
      setSelectedBoxText(`
      다낭/호이안 4~6일 
      #호이안야경투어#5성호텔#5대특식
      
      월드체인 5성급 호텔 숙박과 다낭 여행에서 꼭 방문해야 할 명소와 다양한 특식이 포함되어 있습니다.

      519,000원~
      `);
    }else if(name==='인도네시아')
    {
      setSelectedBoxText(`
      발리 5~7일 
      #짐바란씨푸드#울루와뚜지역#르네상스 #노쇼핑#베네핏
      
      아름다운 선셋과 씨푸드로 유명한 짐바란/울루와뚜 지역의 인기 호텔로 구성된 상품입니다.

      1,589,000원~
      `);
    }else if(name==='싱가포르')
    {
      setSelectedBoxText(`
      싱가포르 5일
      #베스트셀러 #전일관광 #완전일주 #NO쇼핑 #NO팁
      
      전 일정 싱가포르 숙박으로 구석구석 제대로 싱가포르를 즐길 수 있는 상품입니다.

      1,403,400원~
      `);
    }else if(name==='몰디브')
    {
      setSelectedBoxText(`
      몰디브 7일
      #마디푸시 프라이빗 아일랜드 리조트
      
      #라군 추천 신규 럭셔리 리조트 #전 객실 개인풀을 보유한 총 80채의 프라이빗 아일랜드 #플로팅 조식, 익스커션, 스파 등 다양한 포함 사항

      4,860,000원~
      `);
    }else if(name==='대만')
    {
      setSelectedBoxText(`
      대만 3~4일
      #101타워 #영화속명소 #천등날리기
      
      영화 속 명소가 포함되어 대만의 감성을 느낄 수 있는 꾸준한 인기의 상품입니다.

      848,100원~
      `);
    }else if(name==='튀르키예')
    {
      setSelectedBoxText(`
      튀르키예(터키) 일주 9~10일
      #프리미엄 #열기구투어 #단독동굴호텔
      
      국내선 항공 3회 탑승으로 편안한 장거리이동, 카파도키아 단독 동굴호텔이 포함되어 있습니다.

      5,501,000원~
      `);
    }else if(name==='영국')
    {
      setSelectedBoxText(`
      영국 일주 10일
      #정통일주 #잉글랜드/스코틀랜드/북아일랜드/웨일즈
      
      다양한 자연과 문화, 예술로 가득한 잉글랜드, 스코틀랜드, 아일랜드를 모두 만나보는 정통 영국 일주 여행입니다.

      4,790,000원~
      `);
    }else if(name==='스위스')
    {
      setSelectedBoxText(`
      스위스 일주 8일
      #베스트셀러 #알프스여행 
      
      알프스를 깊이있고 여유롭게 즐기는 스위스 일주 여행 시내호텔 1박 이상 숙박, 알프스의 명산을 방문하며 진정한 힐링을 즐기는 여행

      8,790,000원~
      `);
    }else if(name==='이탈리아')
    {
      setSelectedBoxText(`
      이탈리아 일주 8/9일
      #여행의 품격
      
      여유롭고 깊이있는 일정으로 유네스코 가득한 이탈리아를 관광하는 쉼표in유럽 상품입니다.

      5,599,000원~
      `);
    }else if(name==='프랑스')
    {
      setSelectedBoxText(`
      프랑스 일주 7~9일
      #가성비 여행
      
      낭만이 가득한 파리여행, 프랑스를 찾는 관광객이 꼭 찾는 명소 '몽생미쉘'을 방문하는 여행입니다.

      3,929,000원~
      `);
    }else if(name==='독일')
    {
      setSelectedBoxText(`
      독일 완전일주 8~10일
      
      독일의 함부르크에서 베를린을 지나 뮌헨까지! 매력적인 나라 독일을 깊이있게 여행하는 합리적인 가격의 상품입니다.

      3,679,000원~
      `);
    }else if(name==='체코')
    {
      setSelectedBoxText(`
      체코 자유여행 9일
      #프라하 출도착 #에어텔 #항공+호텔
      
      낭만과 품격이 가득한 프라하 출도착 자유여행 항공권 + 호텔 1박이 포함되어있는 프라하 자유여행입니다.

      2,899,000원~
      `);
    }else if(name==='북유럽 3~4국')
    {
      setSelectedBoxText(`
      북유럽 3~4국(덴마크/노르웨이/스웨덴/핀란드) 9~10일
      #베스트셀러
      
      북유럽 4개국(덴마크,노르웨이, 스웨덴, 핀란드) 또는 북유럽 3개국(노르웨이, 스웨덴, 핀란드)를 알차게 관광하는 북유럽 베스트셀러 상품입니다

      5,699,000원~
      `);
    }else if(name==='괌')
    {
      setSelectedBoxText(`
      괌 4~6일
      #에어텔 #항공+호텔 #괌 공항 왕복셔틀
      
      항공+호텔+왕복공항셔틀+여행자보험이 포함된 괌 자유여행 상품입니다

      689,000원~
      `);
    }else if(name==='사이판')
    {
      setSelectedBoxText(`
      사이판 자유여행 4~5일
      #PIC #워터파크천국 #키즈클럽 #사이판플렉스
      
      [왕복항공권+호텔+현지공항미팅/샌딩+여행자보험]이 포함된 사이판 PIC 자유여행 상품입니다.

      704,000원~
      `);
    }else if(name==='호주')
    {
      setSelectedBoxText(`
      호주 비비드시드니 5.24~6.15
      #시드니 #비비드시드니 #디너크루즈
      
      비비드 시드니 축제기간 동안 시드니를 누비는 하나투어 비비드 크루즈에 탑승하여 맛있는 디너를 즐길 수 있는 상품입니다.

      975,000원~

      `);
    }
    else
    setSelectedBoxText(`
    미동부/캐나다 9~10일
    #가성비 #빠짐없는 핵심일정
      
    자유의 여신상 크루즈, 원월드 전망대, 나이아가라 크루즈, 퀘벡 관광을 포함하였습니다.

    3,999,000원~
      `);
    
  };

  

  const handleCloseButtonClick = () => {
    setSelectedBox(null);
    setVideoBlob(null); // 비디오를 닫을 때 Blob 데이터 초기화
    setCurrentCarsPerMin([]);
    setCarsPerMinIndex(0);
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        {selectedBox && (
          <Card
          className="card"
          key="card"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <CloseButton onClick={handleCloseButtonClick}>
            <Icon>
              <RiCloseCircleLine />
            </Icon>
          </CloseButton>
          <CardTitle>{selectedBox}</CardTitle>
          <div>
            {videoBlob ? (
              <img
                src={URL.createObjectURL(videoBlob)}
                alt="Image"
                style={{ width: "310px", height: "310px" }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: "175px", height: "175px" }}
              >
                <RiErrorWarningLine size="150" color="white" />
              </motion.div>
            )}
            <Count>
            <p>{selectedBoxText}</p>
            </Count>
              
              <br />
              
          </div>
          <p></p>  
        </Card>
        
            

        )}
        
      </AnimatePresence>
      {bridges.map((bridge, index) => (
        <Box
          key={index}
          className="box"
          variants={boxVariants}
          initial="initial"
          animate="animate"
          onClick={() => handleBoxClick(bridge.name, bridge.id)} // bridge.id 추가
          color={bridge.color}
        >
          {bridge.name}
        </Box>
      ))}
    </Wrapper>
  );
};

export default BoxGrid;
