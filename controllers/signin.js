const db = require("../models")
const jwt = require('jsonwebtoken');
const redis = require("redis");  
const bcrypt = require("bcryptjs");

const redisClient = redis.createClient(process.env.REDIS_URI);

// need to finish login controller!!!
// need to make sure that login controller returns user table information!!

const handleSignin = (req, res, err) => {
  const {username, password} = req.body;

  // check if username and password are in body
  if(!username || !password) {
    return res.json("Missing username or password")
    // return Promise.reject("Missing username or password.")
  }

  // find user from login table
  return db.Login.findOne( {where: {username:username} }).then( (login, err) => {

    // check if user is in database
    if(err) {return res.json(`Error signing in while finding user. ${err}`)};
    if(!login) {return res.json(`Cannot find username.`)};

    // check to validate password and get user table data.
    const isValid = bcrypt.compareSync(password, login.password);
    if (isValid) {
      return db.User.findOne( {where: {username:username} })
      .then(user => user) 
      .catch(err => Promise.reject(`There was an error retrieving user. ${err}`));
    } else if(!isValid) {
      Promise.reject("Password was incorrect.");
    }

  });
};

const signToken = (user) => {
  const jwtPayload = { user };
  return jwt.sign( jwtPayload, 'JWT_SECRET', {expiresIn: '24h'} );
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user) => {
  const {username, id } = user;
  const token = signToken(username);
  return setToken(token, id)
  .then( () => {
    return { success: 'true', userId: id, token}
  })
  .catch(error => {
    if(error) {return `Error creating session while returning token. \n ${error}`}
  })
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    console.log(reply)
    if (err || !reply) {
      return res.status(400).json("Unauthorized.")
    }
    return res.json({id: reply})
  }); 
};

const loginAuthentication = (req, res, err) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) :
    handleSignin(req, res, err)
    .then(data => {
      console.log(`This is for loginAuth ${data}`)
      return data.id && data.username ? createSessions(data) :
      Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(`Error verifying login during registration. ${err}`));
};


module.exports = {
  handleSignin: handleSignin,
  redisClient: redisClient,
  loginAuthentication: loginAuthentication
}