import axios from "axios";

saveAuthTokenInSession = (token) => {
	window.sessionStorage.setItem('token', token) // session storage may be the preferred method.
}

export default {

	newsSearch: () => { 
		return axios.get("/api/currentnews")
		.catch( err => console.log(`Error retriving information. ${err}`))
	},

	userNewsSearch: (topic, headlines) => {
		if(!topic || topic === undefined) {
			return axios.get(`api/currentnews`);
		}
		else if( (topic && headlines === "headlines") || (topic && headlines === "") ) {
			return axios.get(`api/topicheadlines/${topic}`);
		}
		else if(topic && headlines === "everything") {
			return axios.get(`api/topiceverything/${topic}`);
		};
	},

	retrieveUserInfo: (token, id) => {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': token
		};
		return axios.get(`api/profile/${id}`, headers);
	},

	saveArticle: (data) => {
		const newsItems = {
			published: data.published,
			author: data.author,
			title: data.title,
			image: data.image,
			description: data.description,
			url: data.url,
		};
		const headers = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': data.token
			}
		};
		return axios.post(`/api/articles`, newsItems, headers);
	},

	deleteArticle: (token, id) => {
		const headers = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		};
		return axios.delete(`/api/articles/${id}`, headers)
	},

	startSession: (token) => {
		const headers = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		};
		return (
			axios.post('api/signin', headers)
			.then( response => response.json())
			.then( data => {
				console.log(`This is a test ${data}`)
				if(data && data.userId) {
					axios.get(`api/profile/${data.userId}`, 
					{
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

	onSubmitLogin: (data) => {
		const userInfo = {
			username: data.username,
			password: data.password
		};
		const headers = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return (
			axios.post('/api/signin', userInfo, headers)
			.then( res => res.json())
		)
	},

	userProfile: (data) => {
		return(
			axios.get(`/api/profile/${data.userId}`, 
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': data.token,	
					}
				}
			)
			.then(res=>res.json())
		)
	}

};
