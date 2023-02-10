
import { Route, Switch } from 'react-router-dom';
import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';
import axios from 'axios';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

import "./scss/style.scss";

/*
react-router에서 render이용해서 컴포넌트 보여주기
원치 않는 재마운팅 없이 편리하게 인라인 렌더링이 가능하다.
render를 사용하면 경로가 일치할 때 호출할 함수를 전달할 수 있다.
단, 위처럼 render 함수에 아무것도 전달하지 않으면 route 관련 props를 받을 수 없다.
그러므로 props를 받아와서 복사해서 전달해야한다.

*/
function App() {
  const dispatch = useDispatch();
  const menuOpen = useRef(null);

  //youbteData를 fetching해서 액션객체로 리듀서에 전달하는 함수
  const getYoutube = useCallback(() => {
    const key = 'AIzaSyDq1ThuKd63CGMc178rIvnscNriIww6L4A';
    const playlist = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    axios.get(url).then((json) => {
      const action = setYoutube(json.data.items);
      dispatch(action);
    });
  }, [dispatch]);

  //루트 컴포넌트가 마운트되면 비동기데이터를 전역에 변경 요청
  useEffect(() => {
    getYoutube();
  }, [getYoutube]);
  return (
    <>
      <Switch>
        {/* menuOpen참조객체에 담겨있는 toggle함수를 일단 메인컴포넌트에 props로 전달 */}
        <Route exact path='/' render={() => <Main menuOpen={menuOpen} />} />
        {/* menuOpen참조객체에 담겨있는 toggle함수를  서브전용 헤더컴포넌트에 props로 전달 */}
        <Route path='/' render={() => <Header type={'sub'} menuOpen={menuOpen} />} />
      </Switch>

      <Route path='/department'>
        <Department />
      </Route>

      <Route path='/youtube'>
        <Youtube />
      </Route>

      <Route path='/gallery'>
        <Gallery />
      </Route>

      <Route path='/community'>
        <Community />
      </Route>

      <Route path='/location'>
        <Location />
      </Route>

      <Route path='/members'>
        <Members />
      </Route>

      <Footer />
      <Menu ref={menuOpen} />
    </>
  );
}

export default App;

/*
SSR vs CSR

SSR = Server side Rendering
-페이지 이동시마다 일일 서버쪽에 출력될  html 파일을 요청하는 방법
-장점 : 초기 로딩속도가 빠른편, 검색최적화된 방법
-단점 : 페이지 이동시, 같은 페이지 안에서 컨텐츠가 동적으로 바뀌어야 될때 사용성이 낮아서 불편

CSR = Client side Rendering
- 초기에 화면에 출력될 모든 정보 데이터를 chunk단위로 모두 불러옴
-장점 : 같은 페이지 안에서 서로 다른 컨텐츠를 실시간으로 변경하면서 출력되므로 속도가 빠름(다른컨텐츠를 실시간으로 보여주는 속도)
-단점 : 초기 로딩속도가 느림, 검색엔진 비최적화

*/