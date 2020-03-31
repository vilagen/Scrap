
const db = require("../models")
const jwt = require('jsonwebtoken');
const redis = require("redis");  
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleRegister = (req, res, next) => {

  const { username, email, password, password2 } = req.body;

  if( !username || !email || !password || !password2) {
    return res.status(400).json("Missing required form items.");
  } else if( password != password2) {
    res.status(400).json("Passwords do not match.")
  };

  db.Login.findOne( {where: {username: username} }).then( (existingUser) => {
    if(existingUser) {res.status(400).json({ error: `Username is already taken.` })}
    })
    .catch( error => {
      if(error) {return `Error setting up new user. \n ${error}`}
    });

  db.User.findOne( {where: {username: username}} ).then( (err, existingUser) => {
    if(err) {res.status(400).json(`Error while creating user. ${err}`)}
    else if(existingUser) {res.status(400).json({ error: `Username is already taken.` })}
    })
    .catch( error => {
      if(error) {return `Error setting up new user. \n ${error}`}
    });

  const user = new db.User({
    username: username,
    email: email,
    joined: new Date(),
  });

  user.save()
  .catch( error => {
    if(error) {return `Error creating user while registering to account. \n ${error} `};
  });

  const login = new db.Login({
    username: username,
    email: email,
    password: password
  });

  login.save().then( (login) => {
    createSessions(res, login)
  })
  .catch( error => {
    if(error) {return `Error creating user while registering. \n ${error} `};
  });

}

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
    handleRegister(req, res, db)
    .then(data => {
      return data.id && data.username ? createSessions(data) :
      Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(`Error verifying login during registration. ${err}`));
};

module.exports = {
  handleRegister: handleRegister,
  redisClient: redisClient
};