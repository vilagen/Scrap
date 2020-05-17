module.exports = function(sequelize, DataTypes) {
	let Article = sequelize.define("Article", {

    // source: {
    //   type: DataTypes.STRING,
    // },

    published: {
      type: DataTypes.STRING,
    },

    author: {
      type: DataTypes.STRING,
    },
			
		title: {
			type: DataTypes.STRING,
		},

		image: {
			type: DataTypes.STRING,
    },
    
    description: {
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING,
    },

	});


	return Article;
}