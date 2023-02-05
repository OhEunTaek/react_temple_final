import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import Btns from "./Btns";
import { useRef, useEffect } from 'react';

function Main() {

    return (
        <main>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics />
            <Vids />
            <Btns />
        </main>
    );
}
export default Main