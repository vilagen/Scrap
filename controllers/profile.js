const db = require("../models");

const handleProfileGet = (req, res, err) => {
  const { id } = req.params;
  db.User.findOne( {where: {id:id} }).then( user => {
    if(user) {
      return user
    } else {
      res.status(400).json("User not found.")
    }  
  })
  .catch( err => res.status(400).json("Error retrieving user."))
};

const handleProfileUpdate = (req, res, err) => {
  const {id} = req.params;
  const {first_name, last_name, email} = req.body;
  db.User.findOne( { where: {id:id} }).then (user => {
    
  })
}