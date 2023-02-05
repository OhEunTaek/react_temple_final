import { NavLink } from "react-router-dom";
/*
Link 컴포넌트를 이용한 페이지 이동
link는 a태그처럼 링크로 연결해주지만
url개념이 아니라 path의 개념
NavLink 는 Link의 special version으로 
특정 링크에 적용해서 스타일 넣어줄수 있다
이것이 link와 navlink의 큰 차이점
어떤것이 특별한것인가
activeStyle , activeClassName 속성
=> 리액트 웹의 현재 url과 to가 가르키는 링크가 일치하면
활성화되면서 적용되고, 그렇지 않으면 비활성화 된다
*/
function Header() {
	const active = { color: 'aqua' };
	return (
		<header className={props.type}>
			<div className='inner'>
				<h1>
					<NavLink exact to='/' activeStyle={active}>
						LOGO
					</NavLink>
				</h1>
				<ul id='gnb'>
					<li>
						<NavLink to='/department' activeStyle={active}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeStyle={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeStyle={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeStyle={active}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/location' activeStyle={active}>
							Location
						</NavLink>
					</li>
					<li>
						<NavLink to='/members' activeStyle={active}>
							Membership
						</NavLink>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
