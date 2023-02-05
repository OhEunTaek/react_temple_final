import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {

	const [Traffic, setTraffic] = useState(false);
	//지도 인스턴스값을 담을 참조객체 생성
	const mapInstance = useRef(null);
	const [Location, setLocation] = useState(null);
	const container = useRef(null);
	const { kakao } = window;
	const option = {
		center: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
		level: 3,
	};


	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };


	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	useEffect(() => {
		//지도인스턴스를 참조객체에 옮겨담음
		mapInstance.current = new kakao.maps.Map(container.current, option);
		//참조객체에 담긴 인스턴스 값으로 마커 세팅
		marker.setMap(mapInstance.current);

	}, []);
	useEffect(() => {
		//Traffic state가 변경될때마다 참조객체에 담긴 instance로 부터 교통정보량 출력, 제거
		//인스턴스를 state에 옮겨담는것이 아닌 참고객체에 바로 전달하므로 Optional Chaining 불필요
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}
export default Location;
