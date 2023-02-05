import { useRef, useEffect, useCallback } from 'react';
import PlugIn from '../../asset/plugIn';

function Btns({ setScrolled, setPos }) {
    const pos = useRef([]);
    const num = useRef(4);
    const speed = useRef(500);
    const btnRef = useRef(null);

    //세로 위치값 갱신 함수를 useCallback으로 메모이제이션
    const getPos = useCallback(() => {
        console.log('getPos');
        pos.current = [];
        const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
        for (const sec of secs) pos.current.push(sec.offsetTop);
        setPos(pos.current);
    }, [setPos]);

    //버튼, 박스 활성화 함수로 useCallback으로 메모이제이션
    const activation = useCallback(() => {
        console.log('activation');
        const btns = btnRef.current.children;
        const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
        const scroll = window.scrollY;
        const base = -window.innerHeight / 3;
        setScrolled(scroll);

        pos.current.forEach((pos, idx) => {
            if (scroll >= pos + base) {
                for (const btn of btns) btn.classList.remove('on');
                for (const sec of secs) sec.classList.remove('on');
                btns[idx].classList.add('on');
                secs[idx].classList.add('on');
            }
        });
    }, [setScrolled]);

    useEffect(() => {
        console.log('useEffect');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        getPos();
        window.addEventListener('resize', getPos);
        window.addEventListener('scroll', activation);

        return () => {
            window.removeEventListener('resize', getPos);
            window.removeEventListener('scroll', activation);
        };
    }, [getPos, activation]);
    //메모이제이션된 2개의 함수를 useEffect의 의존성 배열로 등록
    //만약 2개의 함수가 메모이제이션 되어 있지 않다면 useEffect는 무한루프에 빠짐

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
