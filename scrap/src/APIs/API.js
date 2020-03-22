import axios from "axios";

export default {

    newsSearch: () => { 
        return axios.get("/api/currentnews");
    },

    userNewsSearch: (topic, country) => {
        if( (!topic && !country) || (topic === undefined && country === undefined) ) {
            return axios.get("/api/currentnews");
        }
        else if(!topic || topic === undefined) {
            return axios.get(`api/country/${country}`);
        }
        else if(!country || country === undefined) {
            return axios.get(`api/topic/${topic}`);
        }
        else {
            return axios.get("api/userNews", {params: {q: topic, country}});
        };
    }
}