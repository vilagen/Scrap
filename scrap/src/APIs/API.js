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
		axios.post("api/signin", {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		})
		.then( res => res.json())
		.then( data => {
			if(data && data.userId) {
				axios.get(`api/profile/${data.userId}`, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': token
					}
				})
				.then(res => res.json())
				.then(user => {
					if( user && user.username) {
						return user.json()
					}
				})
			}
		})
	}

	// userRegister: (req, res, err) => {
	// 	return axios.post(`api/register`)
	// }

}