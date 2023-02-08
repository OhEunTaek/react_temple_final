import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
function Members() {
	const initVal = {
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		gender: null,
		//체크항목 추가
		interests: null,
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 다섯글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		if (!value.pwd2 || value.pwd1 !== value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (value.email.length < 8 || !/@/.test(value.emial)) {
			errs.email = '이메일은 8글자 이상입력, @를 포함하세요.';
		}
		if (!value.gender) {
			errs.gender = '성별을 선택하세요';
		}
		//interests항목이 false면 에러객체 추가
		if (!Val.interests) {
			errs.interests = '관심사를 하나이상 선택하세요.';
		}
		return errs;
	};
	//인풋요소에서 onChange이벤트가 발생할때마다 기존 Val state값 전체를 갱신하는 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		//state변경함수로 기본 state값을 deep copy해서
		//현재 입력하고 있는 값으로 덮어쓰기
		//객체안의 프로퍼티 명은 대괄호로 감싸야지 변수로 치환가능
		//setVal({...Val, 'userid': value})
		//기존 Val객체를 완전복사해서 'userid':value라는 프로퍼티값을 덮어쓰기
		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);
	//전송버튼 클릭시 실행되는 전송함수
	//내부적으로 check함수의 인수로 현재 Val state의 값을 전달하고
	//반환되는 에러객체 내용을 확인
	//에러객체가 있는 화면에 에러문구 출력
	//에러객체가 비어있으면 인증통과 처리
	const handleSubmit = (e) => {
		e.preventDefault();
		// const err = check(Val);
		// console.log(err);
		//check함수가 반환하는 에러객체를 다시 Err state에 옮겨담음  => 바로위의 useEffect의 의존성배열점검
		setErr(check(Val));
	};
	//radio버튼 이벤트 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		const isChecked = e.target.checked;
		setVal({ ...Val, [name]: isChecked });
	};
	//checkbox 이벤트 함수
	const handleCheck = (e) => {
		//초기값을 false로 지정
		let isChecked = false;
		const { name } = e.target;
		//체크박스를 기준으로 다시 부모요소에서 모든 input요소(체크박스)를 찾음
		const inputs = e.target.parentElement.querySelectorAll('input');

		//체크박스를 반복을 돌면서 하나라도 체크된게 있으면 true값으로 변경후 리턴
		inputs.forEach((el) => {
			if (el.checked) isChecked = true;
		});
		setVal({ ...Val, [name]: isChecked });
	};
	return (
		<Layout name={'Members'}>
			<form action='' onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요'
										//인풋요소의 기본기능으로 입력내용을 출력하는것이 아닌
										//Val스테이트의 userid키값에 있는 내용만 화면에 출력
										value={Val.userid}
										onChange={handleChange}
									/>
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={Val.pwd1}
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th scrope='row'>
									<label htmlFor='pwd2'>RE PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={Val.pwd2}
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd2}</span>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요'
										value={Val.email}
										onChange={handleChange}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										onChange={handleRadio}
									/>

									<label htmlFor='female'>FeMale</label>
									<input
										type='radio'
										name='gender'
										id='female'
										onChange={handleRadio}
									/>
									<span className='err'>{Err.gender}</span>
								</td>
							</tr>
							{/* interests */}
							<tr>
								<th scope='row'>INTERESTS</th>
								<td>
									<label htmlFor='sports'>SPORTS</label>
									<input
										type='checkbox'
										name='interests'
										id='sports'
										onChange={handleCheck}
									/>

									<label htmlFor='music'>MUSIC</label>
									<input
										type='checkbox'
										name='interests'
										id='music'
										onChange={handleCheck}
									/>

									<label htmlFor='game'>GAME</label>
									<input
										type='checkbox'
										name='interests'
										id='game'
										onChange={handleCheck}
									/>

									<span className='err'>{Err.interests}</span>
								</td>
							</tr>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
export default Members;