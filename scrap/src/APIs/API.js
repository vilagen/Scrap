import axios from "axios";

export default {

    newsSearch: () => { 
        return axios.get("/api/currentnews");
    },

    userNewsSearch: (topic, country) => {
        if(!topic || topic === undefined) {
            return axios.get("api/country");
        }
        else if(!country || country === undefined) {
            return axios.get("api/topic");
        }
        else {
            return axios.get("api/userNews");
        };
    }
}