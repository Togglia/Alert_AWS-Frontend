import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, userNicknameAtom } from '../atoms';

// 컴포넌트
const Page = styled.div`
  height: 200vh;
  /* 하늘하늘한 여행 이미지를 위한 백그라운드 스타일 설정 */
  background-size: cover; /* 전체 배경을 꽉 채우도록 설정 */
  background-position: center; /* 배경 이미지가 중앙에 오도록 설정 */
  background-image:
    radial-gradient(circle at 50% 35%, #ffffff 0%, #e1f5fe 40%, #81d4fa 70%, #b3e5fc 100%), /* 부드러운 하늘색 */
    radial-gradient(circle at 10% 10%, #ffffff 0%, #e0f2f1 50%, #b2dfdb 100%), /* 구름의 희미한 느낌 */
    radial-gradient(circle at 90% 10%, #ffffff 0%, #e1f5fe 30%, #81d4fa 80%, #29b6f6 100%); /* 푸른 하늘의 깊이감 */
  background-blend-mode: normal; /* 배경 이미지들을 자연스럽게 섞기 */
`;

const Container = styled.div`
  padding: 0px 20px;
  height: 100%;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  position: relative;
  height: 30vh;
`;

const Row = styled(motion.div)`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
  justify-content: space-evenly;
`;

const CoverSample = styled(motion.div)`
  background-color: white;
  height: 100px;
  width: 100px;
  border-radius: 10%;
  transition: transform 0.3s ease;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;

  a {
    text-decoration: none;
    display: block;
    height: 100%;
    width: 100%;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Box1 = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 24px;
    font-family: 'Merienda', cursive;
    font-weight: 500;
    color: transparent;
    background: linear-gradient(45deg, #8752f1, #ed49c7);
    -webkit-background-clip: text;
    background-clip: text;
  }
  h2 {
    font-size: 80px;
    text-align: center;
    width: 50%;
    color: black;

    /* 미디어 쿼리를 사용하여 창 크기에 따라 크기 조절 */
    @media (max-width: 768px) {
      font-size: 48px;
    }
  }
`;

const Box2 = styled.div`
  height: 100vh;
  padding-top: 20vh;
  background-color: transparent;
  margin: 0px 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ToHome = styled.div`
  width: 30vh;
  height: 10vh;
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 0 100px rgba(255, 84, 32, 0.8);
  margin-bottom: 50px;
  border: none;
  background: #ff783d;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background 0.4s ease-in-out;
  a {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
  }
  &:hover {
    box-shadow: 0, 0, 1000px rgba(73, 32, 255, 0.8);
    background: #ff5e00;
  }
`;

const Explanation = styled.h2`
  font-size: 40px;
  color: transparent;
  background: linear-gradient(45deg, #f1527c, #115fd5);
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 700;
  height: 10vh;
  margin-bottom: 5vh;
`;

const HowToMake = styled.ol`
  height: 70vh;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const How = styled.li`
  color: transparent;
  background: linear-gradient(45deg, #f1527c, #115fd5);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 32px;
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 32px;
  a {
    color: ${(props) => props.theme.accentColor};
  }
`;

const User = styled.h1`
  color: orangered;
  font-size: 32px;
`;

function Intro() {
  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);

  const isLoggedIn = !!userNickname;

  useEffect(() => {
    // userNickname이 세션 스토리지에 있는지 확인
    const storedUserNickname = sessionStorage.getItem('userNickname');
    if (storedUserNickname) {
      // 세션 스토리지에 userNickname이 존재하면 Recoil 상태 업데이트
      setUserNickname(storedUserNickname);
    }
  }, []);
  
  return (
    <Page>
      <Container>
        <Header>
          {isLoggedIn ? (
            <>
              <Title>환영합니다, </Title> <User>{` ${userNickname}`}</User>{' '}
              <Title>님 </Title>
            </>
          ) : (
            ''
          )}
        </Header>
        <Box1>
          <span>AWS 기반 Docker,kubernetes Project </span>
          <h2>이번 여행은 어디로갈까?? </h2>
          <ToHome>
            <Link to={isLoggedIn ? 'http://k8s-default-khsingre-0da62babb7-192191094.ap-northeast-2.elb.amazonaws.com/api/home' : 'http://k8s-default-khsingre-0da62babb7-192191094.ap-northeast-2.elb.amazonaws.com/api/login'}>
              {isLoggedIn ? '서비스 사용' : '로그인 / 회원가입'}
            </Link>
          </ToHome>

        </Box1>

        <Box2>
          <Explanation>How it works</Explanation>
          <HowToMake>
            <How>1. AWS eks를 활용한 3tier 구성</How>
            <How>2. springboot - react 를 사용한 Web App 제공</How>
            <How>3. Argo CD를 사용한 빠르고 안정적인 배포</How>
            {/* <How>4. 학습한 목소리와 반주파일을 합쳐 커버곡 완성</How> */}
          </HowToMake>
        </Box2>
        <Slider>
          <AnimatePresence>
          <Row>
          <CoverSample
                bgPhoto={"data:image/png;base64,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"}
              >
                <a href="https://aws.amazon.com/ko/free/?gclid=CjwKCAjw9IayBhBJEiwAVuc3fidVejFc31vaJVBfgNXmvWrqgPU-JGZEzMLuC_rdLmjajeAEWnWjlBoCk4YQAvD_BwE&trk=bdc27120-6d06-4bae-9be1-22d07b8ec0a7&sc_channel=ps&ef_id=CjwKCAjw9IayBhBJEiwAVuc3fidVejFc31vaJVBfgNXmvWrqgPU-JGZEzMLuC_rdLmjajeAEWnWjlBoCk4YQAvD_BwE:G:s&s_kwcid=AL!4422!3!444218216120!e!!g!!aws%20console!10287751098!99328588021&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all" />
              </CoverSample>
              <CoverSample
                bgPhoto={
                  "data:image/png;base64,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"
                }
              >
                <a href="https://kubernetes.io/" />
              </CoverSample>
              <CoverSample
                bgPhoto={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAADDw8OQkJCamprk5OSgoKD19fXw8PD8/Pzn5+fS0tLJycn5+fnW1tbf39+9vb12dnazs7NnZ2ceHh5XV1dHR0esrKydnZ1OTk7MzMyTk5NhYWF7e3s5OTmCgoKHh4cwMDAhISFubm4WFhZCQkI1NTUoKChLS0sPDw8xMTGC6R1+AAAKSklEQVR4nO2d65qqOgyGFRQRkKOIBxCU0dF1/xe4YWbW2gqhSYEK9Znvf7GvaUtI2nQyGV7Lle6Yiq+pXhBez/fpdHo/hZ5mLYbuWCfpc1vxIzXJN6ePaZM20dDd5NFyoduWEs2yPLw0M9WUjduQumOXgy/Jb593OlRF26EpnrUwbMuNDqWh1q2ZKjqbA0OVhorKVeLWG1NV6cuZ/jfUWRTUs86OaKZluZx/GWrDsUr0Ka1/qB9Dpfnu+CJDsXXrY1FdzgtDbVUv3gibUV3kdsSbHy5DI2DKu/CZo8crdbdbA3pD9/1H92Oce4kXNP7fakvA4yspnnU/7oJU1XzFNvTVQ5d0KwMXg6vRBvD2WqjzJvAyLXJNR2f3yw6g5i288YNwpvUmzLND5Fq2ri95umbEwNPCFd7wSboIpo/TLk/UqBh8c8RQiPbQ0y2+Z6Q9QX3uYk/dRsre0fv84llCZky4HtGe6XwMvXRWDD7H4B04PIqAn15zOKomF9Q1DJKD5lvmfCES6lnzT6AnM3LzGRvp/mcTJJnmu+ZcqKHYSoCeXagTPAfB8m2xmtvGimvlEygF6iTRUYXch64+rgDpG6CfAckAwPeeL7q7rQS+tikBjpbNBpANRbMyvB3QKhTd15ZaQl7cH9RRhWy/G8sCU5UP9RZzVKE206nwyE9LGX8gg7BfYzDhSFebSYOTqbBaNBC+PkZJlQX11mM0aCKcboZzYdha7IDeMhzVRsLxTsbJFupto6PKIBzvZHSguHSTo8oi5PwOe6XAAAdsESbh9DLa9B00GWFHlU04nbYPUYoVGN4APU6MsE1sS5yWumPv3Ug7pKeG7tYjqigh810jWEvdcPaKHx2yJL4doU/9umoTi9Dm+qrJ+LUpw3Kj7SEJOqSHKhOrTZveiPS5bbm+pqZefDn1l8R7/oKnteklQblaGPbe8qOZ6sU95vkBPfmpxDZhi5G6Mpwyy6qpiRdePl+aPH58+ZMbzbCPxpVemEjxtUNhot1xoGz4jx5TjRzNsueXzZeJ/EjLvDw8ji1r3I6w0GkXeHkQ3l61CaO17LaE0sh6e0Lll1B6/RLKL+kJz8db7GWq5ruW7eyBlIZ0hKdb4KUzLXL3tgNtdqh98Y+c8HzZFRY6aL5i2XParoCqTzUuwo9r4Smlh8h3TdhCBLmVZw5K+GUhlctCBA1HeD9fd3mSzQoL7Z15SwsRVJmJAgnXlzDw1ALI2tvG4nUbASoZm94IP07H8NtCilAL4aq8MboQ3gN1W1jILC00HFBNlV0z7QnjsaZr+iI8DIeAqCfCse5hmPRGONYkxqQ3wuEAUPVDOOJB2hPhaHcvTPoibHsW4BX6Jfwl/CUcXr+Ev4S/hOKlG3PzO+cPb2CTjXC5MuxyV4Z2SPN485ys/ARbSES40nZIhlxyQg3vxugIV4Zjun6kpjlhAxnhvO5xcMLl4mtnk1aWMbk9TyH0qBJ0Tq2qbDBCS0u9YMOsYrLB/hxKL+C/STyhSnoCMk6r2QdIDfvyRROuaPsGsXGK/U3rXGvKc4gmvFIfwQ6EME7sfuaaycriCCZEjmk+irk7nvGqwBYpwYQ8D2Gn01aG6W7TsD4m5oMSgsdYmhQjXf2RMSpC8IRHo5iHlP6pWiZgWELOI/2klNW4CDM+QlKdmXER2lkSXqhvxCmt6sO4CP/1yjFplW6kJZyQPn6mpPNUkhMSjovLTrh+e0I8jSU9IZpOlp8Qjpi9EyH2sDcgRA5SvwPh9e0J2fVz34JwyipL8h6El7cnZAUX34SQEV96F8Lb2xM2BxffhrAxuCgPIRbDaQqCy0O4PCEPbSh/Jw/hysGeCgcX5SFcoNHUQHpC9CfAILhUhGhaAzqIIhUhXPLoQVB9GLkIF9iDgeCiXIRwvcMH3aUnnED1VR9VDy7KRljNd9ZUCy7KRohm+mtBcOkIJ1jyrfps+Qht7OGV4KJ8hGBN7kedpCdEf+l576+MhGDV8UYIGQkn0C0Hj3raOColIeq8PVaFk5IQ3x/7EFyUkxAs4v+oh+CipISo8/Z/EFxSQvzWnn/jVFbCCVbJ7l9wUVpC1Hn7G1yUlhB13v4GF+UlRH8wlp4Qdd4U2QlR5+07uCgzIeq85bIT4s6bJTsh6rxNpSecYz+UyE6IO2+m7IS1IoBVraUnRJ23rHoUUTZC/DRs9XYH6QjR362OY/kIUedNekLceZOekPMOWwkJSSfT5SbEnTfpCVHnTXpC4hl+mQlR501+Qo7rliUlpJQykZyQ/vPSElJqfchNOAnfnpDqvLUnZBXMeQUh1XlrT8hxjF4M4eQomJA6D8QR0py39oQ8NS3EENKct/aEPN8wgghJzlt7Qh4HXxQhxXlrT8izmIoipDhvHQg5Sq8IIyTUaetAyDFMhRESnLcOhBzvC3GEeCe6ENI/0gQSos5bF0K6EQUSogcXOxGSZ2Kr03lEQsx560RIXk7bEJ4SH+vct5D/uRvhhHjxa+tTsvHWxEuYsZ23joTExabTOeBj5iK1D08CCYnjFCc02N4Ju7IQcz3tSkj7SGMTLq0U23nILHzJHkqdCUnBBAaho9WuIASEvToYZ9w6E5LqVzYTYmcov4Xf4tK42sCF2LkIKd+hjYQ5CRArDVUK/iCf4SsxgbB+0yWZED2Q/qUrqeZlvVLoEZm9dMJVa0J0A1ApZkWhB9lPi95aJV70RiHEN7k0EWKzcL1JaWVZf/pxCMuq4OdN6rOqELUgRL3fJsLKpoOvSx6zreYre9t51SWPNELMGE2EUZBms8hVTMfQh7oTkUiIRL3kvKPkWexDLe9AyA6YjJmw+R7SqljnIcZMWPl2YK3dDB98zISVRZJFyPDBx0xYqVPPfP82++AjJqwecWB7GI0++IgJqwkmxIe6yUdYzb4ghE0++HgJa84Y5gc3+OBjJTTqgw719GEffIyEK8eHdhvj3zKgDw7Vc3qxFrphW4qrHdQk2DFuKyBcTgD54Nh1Tf1rZTj23o20WeoFuxNHMnePPxsMsgvmWZZXACputFWzPNwcsdgkS3jhftgHb6hx2BZoMbdNy4801QviC8deU4JIwQHABz93AVrpc9ty/eiQFVPoyDPkWogWWACuqYJrHII8K/1nCmVeHB7F8tQE369XE+SD35pizwvDMRW/mEKJF29O/Q45fmVEO4A++E7bG4ty0d5bvjYrFu3wxrM37jWiLDRf4tlMPybhF4T8EyXdMkJxrPl4HHyMYl/QVxEaBx+hznwxaO7y1YPrwhuU5jwnOLioGaAHDf1u49GakGmsi+uI2YA65RExE1cTVkF2KJ2vm9hLVc13Ldug7i6DRT+dJFTrSxx4qhb5lukYPSftuE579qXz8RZ62Y+JRGftlsRtYZ30cQxzLytNZBcmEgtU16L/BXV9KU100HzlBSYiaIlVc8Z0XxcmSspZpAxhIor4Lowtxtwu/jbRvjBRt5XuVVqwtvfdPy+hl2TbyC1nkRxAkGzN+9oIcl+fdkGeHrQCqFi5F6McdD/6D9+fzbLaulUxAAAAAElFTkSuQmCC"
                }
              >
                <a href="https://www.notion.so/cc110f56e69c4d46b51506fe09d7aa65?v=e570dab18bac4d96810b0e7df39bd5d9" />
              </CoverSample>
              <CoverSample
                bgPhoto={
                  "data:image/png;base64,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"
                }
              >
                <a href="https://github.com/Togglia/Alert_AWS-Frontend.git" />
              </CoverSample>
            </Row>
          </AnimatePresence>
        </Slider>
      </Container>
    </Page>
  );
}

export default Intro;
