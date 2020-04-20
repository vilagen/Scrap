import axios from "axios";

export default {

	newsSearch: () => { 
		return axios.get("/api/currentnews")
		.catch( err => console.log(`Error retriving information. ${err}`))
	},

	userNewsSearch: (topic, headlines) => {
		// if( (!topic && !headlines) || (topic === undefined && headlines === undefined) ) {
		//     return axios.get("/api/currentnews");
		// }
		if(!topic || topic === undefined) {
			return axios.get(`api/currentnews`);
		}
		else if(topic && headlines === true) {
			return axios.get(`api/topicheadlines/${topic}`);
		}
		else if(topic && headlines === false) {
			return axios.get(`api/topiceverything/${topic}`);
		};
	},

	startSession: (token) => {
		return (
			axios({
				method: "post",
				url: "api/signin",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then( response => response.json())
			.then( data => {
				console.log(`This is a test ${data}`)
				if(data && data.userId) {
					axios({
						method: "get",
						url: `api/profile/${data.userId}`, 
						headers: {
							'Content-Type': 'application/json',
							'Authorization': token
						}
					})
					.then(res => res.json())
					.then(user => {
						if( user && user.username) {
							return user.json()
						};
					});
				};
			})
		);
	},

	// userRegister: (req, res, err) => {
	// 	return axios.post(`api/register`)
	// }

}