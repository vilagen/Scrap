const axios = require("axios");
require('dotenv').config();

const news_api_key = process.env.REACT_APP_NEWSAPI_KEY;

module.exports = {
  current: function(req, res){
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${news_api_key}`)
    .then(data => { 
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  }
};