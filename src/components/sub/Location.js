import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo } from 'react';

//useMemo : 함수의 리턴값을 메모이제이션
//useCallback : 함수자체를 메모이제이션

function Location() {
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const mapInstance = useRef(null);
	const option = useRef(null);
	const info = useRef(null);
	const container = useRef(null);

	//컴포넌트 재랜더링시 해당 정보값을 매번 변수에 할당하지 않도록 useRef로 참조객체에 저장
	info.current = [
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

	//지도호출에 필요한 위치정보값도 매번 변수에 할당하지 않도록 참조객체에 저장
	option.current = {
		center: info.current[Index].latlng,
		level: 3,
	};

	const imageSrc = info.current[Index].imgUrl;
	const imageSize = info.current[Index].imgSize;
	const imageOption = info.current[Index].imgPos;

	//마커 인스턴스 리턴값을 useMemo로 메모이제이션 처리 (컴포넌트 재호출시에 해당 값을 기억)
	const markerImage = useMemo(
		() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		[imageSrc, imageSize, imageOption, kakao]
	);
	//타입 인스턴스 리턴값 메모이제이션
	const mapTypeControl = useMemo(() => new kakao.maps.MapTypeControl(), [kakao]);
	//줌컨트롤 인스턴스 리턴값 메모이제이션
	const zoomControl = useMemo(() => new kakao.maps.ZoomControl(), [kakao]);
	//마커 인스턴스 리턴값 메모이제이션
	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: markerImage,
		});
	}, [kakao, info, Index, markerImage]);

	useEffect(() => {
		container.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(container.current, option.current);
		marker.setMap(mapInstance.current);
		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
		mapInstance.current.setZoomable(false);

		const setCenter = () => {
			mapInstance.current.setCenter(info.current[Index].latlng);
		};
		window.addEventListener('resize', setCenter);

		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index, kakao, option, info, marker, mapTypeControl, zoomControl]); //처음 지도 생성시 필요한 모든 정보값들을 의존성 등록

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]); //traffic정보 출력할때 필요한 정보값 의존성 등록

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<nav>
				<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

				<ul className='branch'>
					{info.current.map((el, idx) => {
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