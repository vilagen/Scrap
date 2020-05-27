const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
	let Login = sequelize.define("Login", {
			
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				min: 6,
				notNull: {
					msg: "Please enter a username."
				}
			}
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "This field must be a valid email."
				},				
				notNull: {
					msg: "Email is required."
				}
			}
    },
    
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: {
					args: [[8]],
					msg: "Password requires at least 8 characters."
				},
				notNull: {
					msg: "A password is required."
				}
			}
		}
  });
  
  Login.addHook("beforeCreate", (user) => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});
		
	Login.prototype.validPassword = (password) => {
		return bcrypt.compareSync(password, this.password);
	};

	// Login.addHook("beforeCreate", function(user) {
	// 	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	// });
		
	// Login.prototype.validPassword = function(password) {
	// 	return bcrypt.compareSync(password, this.password);
	// };
		
	return Login;
}