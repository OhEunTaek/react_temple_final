import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import Btns from "./Btns";
import { useRef, useEffect, useState } from 'react';

function Main() {
    //News컴포넌트로 전달할 Scrolled state생성
    const [Scrolled, setScrolled] = useState(0);
    const [Pos, setPos] = useState([]);
    return (
        <main>
            <Header type={'main'} />
            <Visual />
            <News Scrolled={Scrolled} Pos={Pos} />
            <Pics />
            <Vids />
            {/* Btns에 setScrolled, setPost 스테이트 변경함수 전달 */}
            <Btns setScrolled={setScrolled} setPos={setPos} />
        </main>
    );
}
export default Main