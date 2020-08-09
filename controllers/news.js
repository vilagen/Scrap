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

  // nice to know how to do this, but seems unnecessary 
  // newsTopicHeadlines: (req, res) => {
  //   userNewsTopicHeadlines( req.params.query, (response) => {res.json(response)});
  // },

  newsTopicHeadlines : (req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?q=${req.params.query}&country=us&apiKey=${news_api_key}`)
    .then(data => {
      res.json(data.data.articles)
    })
    .catch(err => cb.status(422).json(err));
  },

  newsTopicEverything: (req, res) => {
    userNewsTopicEverything( req.params.query, (response) => {res.json(response)} );
  },

  // newsTopicCatagory: (req, res) => {
  //   userNewsTopicCatagory( req.params.query, (response) => {
  //     res.json(response);
  //   });
  // },
 
  // newsCountryResults: (req, res) => {
  //   userNewsCountry( req.params.query, (response) => {
  //     res.json(response);
  //   });
  // },

  // userNewsSearch: (req, res) => {
  //   axios.get(`http://newsapi.org/v2/top-headlines?country=${res.params.query}&category=${topic}&apiKey=${news_api_key}`)
  //   .then(data => {
  //     res.json(data.data.articles)
  //   })
  //   .catch(err => res.status(422).json(err));
  // },

}

  // nice to know how to do this, but seems unnecessary 
// const userNewsTopicHeadlines = (topic, cb) => {
//   axios.get(`https://newsapi.org/v2/top-headlines?q=${topic}&country=us&apiKey=${news_api_key}`)
//   .then(data => {
//     cb(data.data.articles)
//   })
//   .catch(err => cb.status(422).json(err));
// };

  // nice to know how to do this, but seems unnecessary 
const userNewsTopicEverything = (topic, cb) => {
  axios.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${news_api_key}`)
  .then(data => {
    cb(data.data.articles)
  })
  .catch(err => cb.status(422).json(err));
};

const userNewsTopicCatagory = (topic, cb) => {
  axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=${news_api_key}`)
  .then(data => {
    cb(data.data.articles)
  })
  .catch(err => cb.status(422).json(err));
};

const userNewsCountry = (country, cb) => {
  axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${news_api_key}`)
  .then(data => {
    cb(data.data.articles)
  })
  .catch(err => cb.status(422).json(err));
};