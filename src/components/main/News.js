function News({ Scrolled, currentPos }) {
    // const scroll = Scrolled - currentPos;
    const base = -window.innerHeight / 3;
    let scroll = Scrolled - base - currentPos || 0;
    //scroll값이 만약 음수값이면 0으로 값으로 고정
    //scroll값이 음수인 경우는 아직 스크롤 거리값이 해당 컴포넌트 영역에 도달하지 않았을때
    //아래 구문을 주석으로 묶으면 스크롤이 아직 해당 영역에 도달하지 않아도 scroll의 변화값을 연동
    scroll < 0 && (scroll = 0);

    return (
        <section id='news' className='myScroll'>
            <h1 style={{ transform: `translateX(${scroll}px)` }}>News</h1>
            <h2
                style={{
                    transform: `translateX(${100 + scroll * 2}px) scale(${1 + scroll / 50})`,
                    opacity: 1 - scroll / 150,
                }}
            >
                Information
            </h2>
        </section>
    );
}

export default News;