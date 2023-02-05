import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";


function Main() {
    return (
        <main>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics />
            <Vids />
        </main>
    );
}
export default Main