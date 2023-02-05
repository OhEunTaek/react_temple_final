import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const [Vids, setVids] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
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
									setOpen(true);
									setIndex(index)
								}}
							>
								<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			{/* modal로 setOpen 스테이트 변경함수 전달 */}
			{Open && (
				<Modal setOpen={setOpen}>
					<iframe
						title={Vids[0].id}
						//변경된 Index state순번으로 유튜브 영상 출력
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
					></iframe>
				</Modal>
			)}
		</>
	);
}
export default Youtube;