import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
	useEffect(() => {
		const key = 'AIzaSyDq1ThuKd63CGMc178rIvnscNriIww6L4A';
		const playlist = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		axios.get(url).then((json) => {
			console.log(json);
		});
	}, []);
	return (
		<Layout name={'Youtube'}>
			<p>Youtube Content</p>
		</Layout>
	);
}
export default Youtube;