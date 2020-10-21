const { sequelize } = require("../models");
const db = require("../models");

const handleProfileGet = (req, res, err) => {
  db.User.findOne(
    {where: {
      id: req.params.id
    }, 
    include: ['Articles']})
    .then( (user, err) => {
    if(user) {
      user["Articles"].forEach( x => console.log(x.title))
      return res.send(user)
    } else {
      res.status(400).json(`User not found. ${err}`)
    }  
  })
  .catch( err => res.status(400).json(`Error retrieving user. ${err}`))
};

const handleProfileUpdate = (req, res, err) => {
  const {id} = req.params;
  const {first_name, last_name, email} = req.body;
  db.User.findByPk(id).then ( (user, err) => {
    if(user) {
        user.email= email
        user.first_name = first_name,
        user.last_name = last_name,
        user.save();
        return res.json("User information saved.")
    } else {
      res.status(400).json(`Error updating user after retrieving data. ${err}`);
    };
  })
  .catch(err => res.status(400).json(`Error updating user. ${err}`))
};


module.exports ={
  handleProfileGet, handleProfileUpdate
};