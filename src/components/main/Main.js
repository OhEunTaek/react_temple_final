import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import { useRef, useEffect } from 'react';

function Main() {
    //가상돔 main요소를 담을 빈 참조 객체 생성
    const main = useRef(null);
    //섹션별 세로 위치값을 담을 빈배열로 참조 객체 생성
    const pos = useRef([]);

    //가상돔요소의 세로 위치값을 참조객체로 만든 배열에 담는 함수
    const getPos = () => {
        pos.current = [];
        const secs = main.current.querySelectorAll('.myScroll');
        for (const sec of secs) pos.current.push(sec.offsetTop);
        console.log(pos.current);
    };

    //컴포넌트 마운트시
    useEffect(() => {
        //세로 위치값 초기화
        getPos();
        //브라우저 라사이즈 될때마다 getPos호출해서 세로 위치값 갱신
        window.addEventListener('resize', getPos);
    }, []);
    return (
        <main ref={main}>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics />
            <Vids />
        </main>
    );
}
export default Main