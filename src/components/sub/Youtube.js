import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { setYoutube } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
/*
	컴포넌트에서 호출된 비동기 데이터가 전역 store에 저장되는 흐름
	1- 컴포넌트 마운트시 axios가 데이터를 받아옴
	2- 받아진 데이터를 액션생성함수의 인수로 전달해서 payload에 담은 액션 객체를 생성
	3- useDispatch를 이용해서 생성된 액션 객체를 리듀서에 전달
	4- 전역 store에 변경된 데이터를 useSelector로 가져와서 컴포넌트 랜더링
	---redux----
	4- dispatch로 전달한 액션객체를 리듀서가 전달받고 액션타입에 따라서 전역 스테이트값 변경
	5- 변경된 전역 state값은 store에 담김
	6- 변경된 store값은 다시 index.js 의해서 root컴포넌트인 App에 전달됨
	7- 그 이후터는 어떤 자식 컴포넌트들이라도 useSelector를 이용해서 전역 state가 담겨있는 store에 접근 가능
*/
function Youtube() {
	//순서1 - useDispatch로 부터 dispatch함수 활성화
	const dispatch = useDispatch();
	//순서2 - 전역 store로부터 빈 youtubeReducer의 빈 초개 배열값을 가져옴
	//순서5 - 리듀서를 통해서 전역 store값이 변경되면 순간적으로 두번쨰 랜더링 싸이클에 Vids에는 전역으로부터  youtube 데이터 저장
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	// const [Vids, setVids] = useState([]);
	const modal = useRef(null);
	// const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	useEffect(() => {
		const key = 'AIzaSyBjrOKaWRkP5g3P8aW1QsSd1bpFDhUKVZk';
		const playlist = 'PLR22mOC3bZYoRxVtcK0_J5EOkq7SK9Tv9';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		axios.get(url).then((json) => {
			//setVids(json.data.items);
			//순서3 - 비동기로 받아진 데이터를 지역 스테이트에 저장하는 것이 아닌
			// setYOutube를 통해서 action를 생성하고
			//생성된 action객체를 dispatch로 리듀서에 전달
			const action = setYoutube(json.data.items);
			dispatch(action);
		});
	}, [dispatch]);
	return (

		<>
			<Layout name={'Youtube'}>
				{Vids.map((data, index) => {
					const tit = data.snippet.title;
					const desc = data.snippet.description;
					const date = data.snippet.publishedAt;

					return (
						<article key={data.id}>
							<h3>{tit.length > 60 ? tit.substr(0, 60) + '...' : tit}</h3>

							<div className='txt'>
								<p>{desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>

							<div
								className='pic'
								onClick={() => {
									setIndex(idx);
									modal.current.open();
									// setOpen(true);
									// setIndex(index)
								}}
							>
								<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			<Modal ref={modal}>
				<iframe title={Vids[0]?.id} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}
export default Youtube;