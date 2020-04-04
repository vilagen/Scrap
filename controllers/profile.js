const db = require("../models");

const handleProfileGet = (req, res, err) => {
  const { id } = req.params;
  db.User.findOne( {where: {id:id} }).then( (user, err) => {
    if(user) {
      return user
    } else {
      res.status(400).json(`User not found. ${err}`)
    }  
  })
  .catch( err => res.status(400).json(`Error retrieving user. ${err}`))
};

const handleProfileUpdate = (req, res, err) => {
  const {id} = req.params;
  const {first_name, last_name, email} = req.body;
  db.User.findOne( { where: {id:id} }).then ( (user, err) => {
    if(user) {
      db.User.update({
        first_name:first_name,
        last_name:last_name,
        email:email
      });
    } else {
      res.status(400).json(`Error updating user after retrieving data. ${err}`);
    };
  })
  .catch(err => res.status(400).json(`Error updating user. ${err}`))
};

module.exports ={
  handleProfileGet, handleProfileUpdate
};