import { useEffect, useRef } from "react";
function Layout(props) {
    //props는 부모로부터 전달받은 인수값
    const frame = useRef(null);
    //useRef사용하는 방법
    //1. 리액트로부터 useRef를 임포트한다
    //2. 변수에 useRef의 초기값을 설정해 담는다
    //3. 우리가 참조하고자 하는 곳에 ref={변수}을 쓴다
    // useRef는 current라는 공간안에 해당 값을 저장한다
    console.log(frame);

    useEffect(() => {
        frame.current.classList.add('on');
    }, []);
    return (
        <section className={`content ${props.name}`} ref={frame}>
            <figure></figure>
            <div className='inner'>
                <h1>{props.name}</h1>
                {props.children}
            </div>
        </section>
    );
}

export default Layout;