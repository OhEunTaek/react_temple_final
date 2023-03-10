import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
//npm install --save react-masonry-component 설치
import Modal from '../common/Modal';
function Gallery() {

	const masonryOptions = { transitionDuration: '0.5s' };
	const myId = '197119297@N02';
	const frame = useRef(null);
	const input = useRef(null);
	const modal = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [Index, setIndex] = useState(0);
	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = 'ae5dbef0587895ed38171fcda4afb648';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 20;
		let url = '';
		//만약 인수로 전달받은 opt객체의 type이 'interest'이면
		//interest방식의 url을 만들어서 axios호출
		if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&method=${method_search}&api_key=${key}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&method=${method_user}&api_key=${key}&per_page=${num}&user_id=${opt.user}`;
		const result = await axios.get(url);
		if (result.data.photos.photo.length === 0) {
			frame.current.classList.add('on');
			setLoading(false);
			return alert('해당  검색어의 결과 이미지가 없습니다.');
		}
		setItems(result.data.photos.photo);
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 500);

	};
	const showUser = (e) => {
		getFlickr({ type: 'user', user: e.target.innerText });
		frame.current.classList.remove('on');
		setLoading(true); //변경
	};
	const showMine = () => {
		getFlickr({ type: 'user', user: myId });
		frame.current.classList.remove('on');
		setLoading(true);
	};
	const showInterest = () => {
		getFlickr({ type: 'interest' });
		frame.current.classList.remove('on');
		setLoading(true);
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요');
		input.current.value = '';
		getFlickr({ type: 'search', tags: result });
		frame.current.classList.remove('on');
		setLoading(true);
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: myId });

	}, []);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='controls'>
					<div className='searchBox'>
						<input type='text' ref={input} placeholder='검색어를 입력하세요' onKeyUp={(e) => e.key === 'Enter' && showSearch()} />
						<button onClick={showSearch}>Search</button>
					</div>

					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={showMine}>My Gallery</button>
					</nav>
				</div>


				{Loading && <img className='loading' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='로딩이미지' />}

				<div className='frame' ref={frame}>

					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												modal.current.open();
											}}
										>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>
			<Modal ref={modal}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}
export default Gallery;