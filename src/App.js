import { Route, Switch } from 'react-router-dom';


//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

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
  return (
    <>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/' render={() => <Header type={'sub'} />}></Route>
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