const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Actor";
    let cols = {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id: DataTypes.INTEGER
    };
    let config = {
        // timestamps: false
    };

    const Actor = sequelize.define(alias,cols);

    Actor.associate = (models => {
        Actor.belongsTo(models.Movie, {as: 'favorite_movie', foreignKey: 'favorite_movie_id'});

        Actor.belongsToMany(models.Movie, {
            as: 'peliculas',
            through: 'actor_movie'
        })
    })
    
    return Actor;
};