import { Route, Switch } from 'react-router-dom';


//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

/*
스위치를 임포트하고 메인과 서브 헤더 디자인 차별화에 사용

switch는 좀더 자세하게 적은'exact ' 내용을 먼저 채택하고 예외로 그렇지 않은 내용들을 처리
스타일 적용을 위해 사스에 스타일 추가 및 
header.js에 클래스네임에 따라서 스타일이 적용되도록 switch로 메인과 서브에 클래스를 부여함 type={} 이라는 프롭으로 클래스이름을 전달함
*/

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          {/* 메인에만 적용되는 header */}
          <Header type={'main'} />
          <Visual />
          <Content />
        </Route>

        <Route path='/'>
          <Header type={'sub'} />
        </Route>
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