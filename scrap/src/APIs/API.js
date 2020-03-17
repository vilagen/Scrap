import axios from "axios";

export default {

    newsSearch: () => { 
        return axios.get("/api/currentnews");
    },
}