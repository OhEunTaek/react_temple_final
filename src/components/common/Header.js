import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';
/*
npm i --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome@latest
이구문으로 폰트어썸 설치 

*/

//npm i framer-motion@6  6버전 설치
function Header(props) {
	const menu = useRef(null);
	const active = { color: 'aqua' };
	return (
		<>
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
					<FontAwesomeIcon icon={faBars} onClick={() => menu.current.toggle()} />
					{/* <FontAwesomeIcon icon={faBars} onClick={() => props.menuOpen.current.toggle()} /> */}
				</div>
			</header>
			<Menu ref={menu} />
		</>
	);
}

export default Header;
