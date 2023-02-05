import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {

	const { kakao } = window;
	//각 지점별 정보값 배열로 그룹핑
	const info = [
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(37.5206868, 127.1214941),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];


	const [Traffic, setTraffic] = useState(false);

	//지점 버튼 클릭시 변경할 순번이 담길 state
	const [Index, setIndex] = useState(0);

	const mapInstance = useRef(null);
	const container = useRef(null);
	const option = {
		center: info[Index].latlng,
		level: 3,
	};

	const imageSrc = info[Index].imgUrl;
	const imageSize = info[Index].imgSize;
	const imageOption = info[Index].imgPos;

	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


	const marker = new kakao.maps.Marker({
		position: info[Index].latlng,
		image: markerImage,
	});

	useEffect(() => {
		mapInstance.current = new kakao.maps.Map(container.current, option);
		marker.setMap(mapInstance.current);

	}, []);
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>
			{/* 배열의 정보값으로 동적으로 버튼을 생성하고 */}
			{info.map((el, idx) => {
				return (
					<li
						key={idx}
						onClick={() => {
							//각 버튼 클릭시 클릭한 순번으로 Index state변경
							setIndex(idx);
						}}
					>
						{el.title}
					</li>
				);
			})}
		</Layout>
	);
}
export default Location;
