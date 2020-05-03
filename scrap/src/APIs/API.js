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

	saveArticle: (data) => {

		const newsItems = {
			published: data.published,
			author: data.author,
			title: data.title,
			image: data.image,
			description: data.description,
			url: data.url,
		}

		const headers = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': data.token
			}
		}

		return axios.post(`/api/articles`, newsItems, headers);
		
	},

	deleteArticle: id => {

		console.log(id);

		// return axios.delete(`/api/articles/${id}`, headers)

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

};