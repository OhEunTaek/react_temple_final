import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
	// const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	// const key = 'ae5dbef0587895ed38171fcda4afb648';
	// const method_interest = 'flickr.interestingness.getList';
	// const num = 20;
	// const url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;

	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = 'ae5dbef0587895ed38171fcda4afb648';
		const method_interest = 'flickr.interestingness.getList';
		const num = 20;
		let url = '';
		//만약 인수로 전달받은 opt객체의 type이 'interest'이면
		//interest방식의 url을 만들어서 axios호출
		if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);
	};
	const [Items, setItems] = useState([]);

	useEffect(() => {
		getFlickr({ type: 'interest' });
		//getFlickr({type: 'search', tags: '하늘'})
		// axios.get(url).then((json) => {
		// 	console.log(json.data.photos.photo);
		// 	setItems(json.data.photos.photo);
		// });
	}, []); //dependency array 제거

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										alt={item.title}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
export default Gallery;