import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

/*
	localstorage: 
	- 각각의 브라우저에 있는 로컬 저장공간
	- 문자만 저장 가능 (문자값이 아닌 데이터는 문자화해서 저장)
	- 5MB 까지만 저장가능한 경량의 저장공간
	- {key: 문자열형태의 값}
	- localStorage.setItem(값) - 값저장
	- localStorage.getItem(key) - 값가져옴
*/

function Community() {
	const getLocalData = () => {
		//처음 컴포넌트 함수가 실행되자마자 로컬스토리지로부터 post키값으로 데이터를 가지고옴
		const data = localStorage.getItem('post');

		if (data) {
			//데이터가 있으면 해당 데이터를 객체형식으로 parsing해서 리턴
			return JSON.parse(data);
		} else {
			//데이터가 없으면 빈 배열을 리턴
			return [];
		}
	};
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());

	const [Allowed, setAllowed] = useState(true);

	//폼 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	//글 저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	//글 삭제 함수
	const deletePost = (index) => {
		setPosts(Posts.filter((_, idx) => idx !== index));
	};
	//글 수정함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);

		setAllowed(true);
	};

	//글 수정모드 변경함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};
	//글 출력모드 변경함수
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	useEffect(() => {
		// axios.get(`${process.env.PUBLIC_URL}/DB/dummyPosts.json`).then((json) => {
		// 	setPosts(json.data.posts);
		// });
	}, []);
	useEffect(() => {
		console.log('update');
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='4' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>
			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정 모드
								<>
									<div className='txt'>
										<h2>
											<input type='text' defaultValue={post.title} ref={inputEdit} />
											<br />
											<textarea cols='30' rows='4' defaultValue={post.content} ref={textareaEdit}></textarea>
											<br />
										</h2>
									</div>

									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATED</button>
									</div>
								</>
							) : (
								//출력 모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;