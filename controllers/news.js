const axios = require("axios");
require('dotenv').config();

const news_api_key = process.env.REACT_APP_NEWSAPI_KEY;

module.exports = {
  current: (req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${news_api_key}`)
    .then(data => { 
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  },

  userNewsTopic: (topic) => {
    axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=${news_api_key}`)
    .then(data => {
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  },

  userNewsCountry: (country) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${news_api_key}`)
    .then(data => {
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  },

  userNewsSearch: (topic, country) => {
    axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${news_api_key}`)
    .then(data => {
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  },

};