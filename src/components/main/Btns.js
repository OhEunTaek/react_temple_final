import { useRef, useEffect } from 'react';
import PlugIn from '../../asset/plugIn';

function Btns() {
    const pos = useRef([]);
    const num = useRef(4); //useRef의 특별한 용도
    const speed = useRef(500);
    const btnRef = useRef(null);

    //세로 위치값 갱신 함수
    const getPos = () => {
        pos.current = [];
        const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
        for (const sec of secs) pos.current.push(sec.offsetTop);
    };

    //버튼, 박스 활성화 함수
    const activation = () => {
        const btns = btnRef.current.children;
        const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
        const scroll = window.scrollY;
        const base = -window.innerHeight / 3;

        pos.current.forEach((pos, idx) => {
            if (scroll >= pos + base) {
                for (const btn of btns) btn.classList.remove('on');
                for (const sec of secs) sec.classList.remove('on');
                btns[idx].classList.add('on');
                secs[idx].classList.add('on');
            }
        });
    };

    useEffect(() => {
        //컴포넌트 마운트 되면 상단으로 강제 이동 - smooth하게
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        getPos();
        window.addEventListener('resize', getPos);
        window.addEventListener('scroll', activation);

        return () => {
            //window객체는 최상의 전역 객체이기 때문에..
            //윈도우객체에 이벤트연결시 해당 이벤트가 다른 컴포넌트 페이지에도 실행되는게 아니라면
            //해당 컴포넌트가 unmount될떄 clean-up함수로 이벤트 연결을 제거
            window.removeEventListener('resize', getPos);
            window.removeEventListener('scroll', activation);
        };
    }, []);

    return (
        <ul className='scroll_navi' ref={btnRef}>
            {/* 참조객체의 num의 갯수대로 빈배열을 임의로 만들고 반복처리 */}
            {Array(num.current)
                .fill()
                .map((_, idx) => {
                    // 현재 반복도는 순번이 0번째이면 해당 li에만 on클래스를 추가
                    let isOn = '';
                    idx === 0 && (isOn = 'on');
                    return (
                        <li
                            key={idx}
                            className={isOn}
                            onClick={() => {
                                new PlugIn(window, {
                                    prop: 'scroll',
                                    value: pos.current[idx],
                                    duration: speed.current,
                                });
                            }}
                        ></li>
                    );
                })}
        </ul>
    );
}

export default Btns;