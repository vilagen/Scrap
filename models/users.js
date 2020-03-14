const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define("User", {

    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: {
          msg: "Please enter your first name."
        }
      }
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: {
          msg: "Please enter your first name."
        }
      }
    },
			
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
				isEmail: true,
				// msg: "This field must be a valid email.",
				// notNull: {
				// 	msg: "Email is required."
				// }
			}
    },
    
    saved_entries: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
    },

    joined: {
      type: DataTypes.DATE,
		}

	});

	return User;
}