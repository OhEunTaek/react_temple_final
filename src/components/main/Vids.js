import { useSelector } from 'react-redux';
function Vids() {
    const { youtube } = useSelector((store) => store.youtubeReducer);
    // console.log(youtube);
    return (
        <section id='vids' className='myScroll'>
            <h1>Youtube</h1>
            {youtube.map((vid, idx) => {
                return <p key={idx}>{vid.snippet.title}</p>;
            })}
        </section>
    );
}

export default Vids;