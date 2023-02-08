import { useRef } from 'react';

function News({ Scrolled, currentPos }) {
    const getLocalData = () => {
        const data = localStorage.getItem('post');
        return JSON.parse(data);
    };
    const data = useRef(getLocalData());
    const base = -window.innerHeight / 3;
    let scroll = Scrolled - base - currentPos || 0;

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
            <div className='wrap'>
                {data.current.map((data, idx) => {
                    if (idx >= 3) return null;

                    return (
                        <article key={idx}>
                            <h5>{data.title}</h5>
                            <p>{data.content}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default News;