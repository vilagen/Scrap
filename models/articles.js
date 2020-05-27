module.exports = function(sequelize, DataTypes) {
	let Article = sequelize.define("Article", {

    author: {
      type: DataTypes.STRING,
    },
			
		title: {
			type: DataTypes.STRING(500),
		},

		image: {
			type: DataTypes.STRING(500),
    },
    
    description: {
      type: DataTypes.TEXT,
    },

    url: {
      type: DataTypes.STRING(500),
    },

    published: {
      type: DataTypes.STRING(255),
    },

	});


	return Article;
}