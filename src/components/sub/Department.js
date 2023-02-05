import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
/*
npm i axios로 설치

리액트에서의 기본적인 컴포넌트 제작 흐름
process.env.PUBLIC_URL : public폴더까지의 경로값을 구함
axios로 외부 데이터 호출할때는 보통 useEffect의 의존성 배열을 비워서
컴포넌트가 처음 마운트되었을때 한번만 데이터 요청
axios 요청받은 데이터는 보통 useState를 이용해서 state로 관리
state에 담겨있는 값으로 동적 가상돔 생성
*/


function Department() {
	//state생성
	const [Members, setMembers] = useState([]);

	//처음 컴포넌트가 마운트 되었을떄 한번만 외부 데이터 호출해서 state에 담음
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((json) => {
			console.log(json);
			setMembers(json.data.members);
		});
	}, []);

	//Members state변경될때마다 호출
	useEffect(() => {
		console.log(Members);
	}, [Members]);
	return (
		<Layout name={'Department'}>
			{Members.map((data, idx) => {
				// 반복적인 요소 렌더링시에는 무조건 고유의 key prop을 생성해야한다 먼저 키프롭없이 해보고 경고창을 살펴볼것
				//return <p key={idx}>{data.name}</p>;
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${data.pic}`} alt={data.name} />
							</div>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
export default Department;
