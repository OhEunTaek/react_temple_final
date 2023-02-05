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

	//타입 컨트롤 인스턴스 생성
	const mapTypeControl = new kakao.maps.MapTypeControl();
	//줌 컨트롤 인스턴스 생성
	const zoomControl = new kakao.maps.ZoomControl();

	const marker = new kakao.maps.Marker({
		position: info[Index].latlng,
		image: markerImage,
	});

	//Index state가 변경될떄마다 지도인스턴스를 새로 생성
	useEffect(() => {
		container.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(container.current, option);
		marker.setMap(mapInstance.current);
		//지도 컨트롤 생성
		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		//줌 컨트롤 생성
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
		//지도 위치를 가운데로 변경하는 함수 추가
		const setCenter = () => {
			mapInstance.current.setCenter(info[Index].latlng);
		};
		//브라우저 리사이즈 이벤트 발생할때마다 실행 말그대로 리사이즈라는 이벤트를 발생할때만
		window.addEventListener('resize', setCenter);

		//컴포넌트 언마운트시 해당 이벤트리스터 제거
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index]); //의존배열에 Index
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<nav>
				<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

				<ul className='branch'>
					{info.map((el, idx) => {
						let isOn = '';

						Index === idx && (isOn = 'on');
						return (
							<li
								key={idx}
								className={isOn}
								onClick={() => {
									setIndex(idx);
									setTraffic(false);
								}}
							>
								{el.title}
							</li>
						);
					})}
				</ul>
			</nav>
		</Layout>
	);
}
export default Location;
