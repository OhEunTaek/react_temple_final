
import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';


function Youtube() {
	//App에서 변경요청이 일어난 전역 데이터를 호출
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((data, idx) => {
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