import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	//토글 버튼을 클릭할때마 변경될 state
	const [Traffic, setTraffic] = useState(false);
	//지도 인스턴스를 담을 state
	const [Location, setLocation] = useState(null);
	//지도가 담길 프레임 참조객체
	const container = useRef(null);
	//윈도우 객체로부터 kakao객체 직접 비구조화할당으로 추출
	const { kakao } = window;
	//지도의 기본 정보
	const option = {
		center: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
		level: 3,
	};

	//마커 이미지 정보 준비
	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };

	//위의 정보를 바탕으로 마커이미지 인스턴스 생성
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	//마커 인스턴스 생성
	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	useEffect(() => {
		//기본 지도 인스턴스 생성
		const map_instance = new kakao.maps.Map(container.current, option);
		//마커인스턴스로부터 setMap메서드를 호출하고 인스턴스로 지도 기본 인스턴스값 전달
		marker.setMap(map_instance);
		setLocation(map_instance);
	}, []);
	useEffect(() => {
		//Traffic가 변경될때마다
		//해당 true 면 교통정보출력, 그렇지않으면 교통정보 제거
		//옵셔널 체이닝: ?앞의 객체정보값이 있을때만 다음 메서드구문을 실행하고 그렇지 않으면 해당 코드 무시
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}
export default Location;
