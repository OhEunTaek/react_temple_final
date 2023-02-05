import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
	const [Vids, setVids] = useState([]);
	useEffect(() => {
		const key = 'AIzaSyDq1ThuKd63CGMc178rIvnscNriIww6L4A';
		const playlist = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		axios.get(url).then((json) => {
			console.log(json.data.items);
			setVids(json.data.items);
		});
	}, []);
	return (
		<Layout name={'Youtube'}>
			{Vids.map((data) => {
				return (
					<article key={data.id}>
						<h3>{data.snippet.title}</h3>

						<div className='txt'>
							<p>{data.snippet.description}</p>
							<span>{data.snippet.publishedAt}</span>
						</div>

						<div className='pic'>
							<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
export default Youtube;