const {sequelize, DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    let alias = "Movie";
    let cols = {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATE,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    };
    let config = {
        // timestamps: false
    };

    const Movie = sequelize.define(alias,cols);
    
    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);

        Movie.hasMany(models.Actor, {as: 'actor_favorite', foreignKey: 'favorite_movie_id'});

        Movie.belongsToMany(models.Actor,{
            as: 'actores',
            through: 'actor_movie'
            
        });
    });


    return Movie;
};