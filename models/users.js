module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define("User", {

    first_name: {
			type: DataTypes.STRING,
			validate: {
				min:2,
			}
    },

    last_name: {
			type: DataTypes.STRING,
			validate: {
				min:2,
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
				isEmail: {
					msg: "This field must be a valid email."
				},				
				notNull: {
					msg: "Email is required."
				}
			}
    },
    
    saved_entries: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
    },

    joined: {
      type: DataTypes.DATE,
		}

	}, {});
	User.associate = models => {
		User.hasMany(models.Article)
	}

	return User;
}