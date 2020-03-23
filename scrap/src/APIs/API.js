import axios from "axios";

export default {

	newsSearch: () => { 
			return axios.get("/api/currentnews");
	},

userNewsSearch: (topic, headlines) => {
		// if( (!topic && !headlines) || (topic === undefined && headlines === undefined) ) {
		//     return axios.get("/api/currentnews");
		// }
		if(!topic || topic === undefined) {
			return axios.get(`api/currentnews`);
		}
		else if(topic && headlines === "yes") {
			return axios.get(`api/topicheadlines/${topic}`);
		}
		else if(topic && headlines === "no") {
			return axios.get(`api/topiceverything/${topic}`);
		};
	}
}