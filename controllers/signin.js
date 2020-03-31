const db = require("../models")
const jwt = require('jsonwebtoken');
const redis = require("redis");  
const bcrypt = require("bcryptjs");

const redisClient = redis.createClient(process.env.REDIS_URI);

// need to finish login controller!!!
// need to make sure that login controller returns user table information!!

const handleSignin = (req, res, err) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.json("Missing username or password")
    // return Promise.reject("Missing username or password.")
  }
  
  db.Login.findOne( {where: {username:username} }).then( (user, err) => {
    // check if user is in database
    if(err) {return res.json(`Error signing in while finding user. \n ${err}`)};
    if(!user) {return res.json(`Error; cannot find username. \n ${err}`)};

    // check to validate password
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      console.log(user);
      return res.json(user)
      .catch(err => res.json(`There was an error retrieving user. \n ${err}`));
    };
    if (!isValid) {
      return res.json("Password was incorrect.");
    };
  });
};

const signToken = (user) => {
  const jwtPayload = { user };
  return jwt.sign( jwtPayload, 'JWT_SECRET', {expiresIn: '24h'} );
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (res, user) => {
  const {username, id } = user;
  const token = signToken(username);
  return setToken(token, id)
  .then( () => {
    return { success: 'true', userId: id, token}
  })
  .then(session => res.json(session))
  .catch(error => {
    if(error) {return `Error creating session while returning token. \n ${error}`}
  })
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    console.log(reply)
    if (err || !replay) {
      return res.status(400).json()
    }
    return res.json({id: reply})
  }); 
};

const loginAuthentication = (db) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) :
    handleSignin(req, res, err)
    .then(data => {
      return data.id && data.username ? createSessions(data) :
      Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(`Error verifying login during registration. ${err}`));
};


module.exports = {
  handleSignin: handleSignin
}