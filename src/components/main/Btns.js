import { useRef, useEffect } from 'react';

function Btns() {
    const pos = useRef([]);
    const btnRef = useRef(null);

    const getPos = () => {
        pos.current = [];
        const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
        for (const sec of secs) pos.current.push(sec.offsetTop);
        console.log(pos.current);
    };

    useEffect(() => {
        getPos();
        window.addEventListener('resize', getPos);
    }, []);

    return (
        <ul className='scroll_navi' ref={btnRef}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    );
}

export default Btns;