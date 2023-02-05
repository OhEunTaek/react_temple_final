import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Department() {
	const [Members, setMembers] = useState([]);
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);


	return (
		<Layout name={'Department'}>
			{Members.map((data, idx) => {
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${data.pic}`} alt={data.name} />
							</div>
							<h3>{data.name}</h3>
							<p>{data.position}</p>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
export default Department;
