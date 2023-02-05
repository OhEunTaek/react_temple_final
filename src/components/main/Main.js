import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import Btns from "./Btns";
import { useState } from 'react';

function Main() {

    const [Scrolled, setScrolled] = useState(0);
    const [Pos, setPos] = useState([]);
    return (
        <main>
            <Header type={'main'} />
            <Visual />
            <News Scrolled={Scrolled} currentPos={Pos[1]} />
            {/* News로 고정하기 위해 인덱스값을 1로 설정 currentPos={Pos[1]}주의 */}
            <Pics />
            <Vids />

            <Btns setScrolled={setScrolled} setPos={setPos} />
        </main>
    );
}
export default Main