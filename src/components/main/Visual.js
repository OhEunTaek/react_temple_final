import { useRef } from 'react';
import Anime from '../../asset/plugIn';

function Visual() {
	const rect = useRef(null);
	const speed = 1000;

	const openBox = () => {
		const [top, right, bottom, left, con] = rect.current.children;
		new Anime(top, {
			prop: 'width',
			value: '100%',
			duration: speed,
			callback: () => {
				new Anime(right, {
					prop: 'height',
					value: '100%',
					duration: speed,
					callback: () => {
						new Anime(bottom, {
							prop: 'width',
							value: '100%',
							duration: speed,
							callback: () => {
								new Anime(left, {
									prop: 'height',
									value: '100%',
									duration: speed,
									callback: () => {
										new Anime(con, {
											prop: 'opacity',
											value: 1,
											duration: speed * 2,
										});
									},
								});
							},
						});
					},
				});
			},
		});
	};

	const closeBox = () => {
		const [top, right, bottom, left, con] = rect.current.children;

		new Anime(con, {
			prop: 'opacity',
			value: 0,
			duration: speed,
			callback: () => {
				new Anime(top, { prop: 'width', value: '0%', duration: speed });
				new Anime(left, { prop: 'height', value: '0%', duration: speed });
				new Anime(right, { prop: 'height', value: '0%', duration: speed });
				new Anime(bottom, { prop: 'width', value: '0%', duration: speed });
			},
		});
	};

	return (
		<figure id='visual' className='myScroll'>
			<button className='btnOpen' onClick={openBox}>
				open
			</button>
			<div className='react' ref={rect}>
				<div className='top'></div>
				<div className='right'></div>
				<div className='bottom'></div>
				<div className='left'></div>
				<div className='con'>
					<span className='btnClose' onClick={closeBox}>
						close
					</span>
				</div>
			</div>
		</figure>
	);
}

export default Visual;