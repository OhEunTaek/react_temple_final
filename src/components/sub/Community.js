import Layout from "../common/Layout";

/*
common 폴더의 Layout.js에서 만든 공통레이아웃을 impot한후
<Layout>으로 받고, {props.children}에 해당하는 내용인 p태그도 작성한다
*/

function Community() {
	return (

		<Layout name={'Community'}>
			{/* 부모에서 자식으로 props로 넘길 속성과 값을 지정한것
			name={'Community'}이것 자체가  props인것 */}
			<p>Community Content</p>

		</Layout>

		// <section className='content community'>
		// 	<figure></figure>
		// 	<div className='inner'>
		// 		<h1>COMMUNITY</h1>
		// 	</div>
		// </section>
	);
}

export default Community;