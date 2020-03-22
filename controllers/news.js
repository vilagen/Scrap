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

  newsTopicResults: (req, res) => {
    userNewsTopic( req.params.query, (response) => {
      res.json(response);
    });
  },
 
  newsCountryResults: (req, res) => {
    userNewsCountry( req.params.query, (response) => {
      res.json(response);
    });
  },

  userNewsSearch: (topic, country) => {
    axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${news_api_key}`)
    .then(data => {
      res.json(data.data.articles)
    })
    .catch(err => res.status(422).json(err));
  },

}

const userNewsTopic = (topic, cb) => {
  axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=${news_api_key}`)
  .then(data => {
    cb(data.data.articles)
  })
  .catch(err => cb.status(422).json(err));
}

const userNewsCountry = (country, cb) => {
  axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${news_api_key}`)
  .then(data => {
    cb(data.data.articles)
  })
  .catch(err => cb.status(422).json(err));
}