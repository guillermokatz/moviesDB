const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Actor_Movie";
    let cols = {
        actor_id: DataTypes.INTEGER,
        movie_id: DataTypes.INTEGER
    };
    let config = {
        tableName: "actor_movie"
    };

    const Actor_Movie = sequelize.define(alias,cols,config);
    
    Actor_Movie.associate = (models => {
        Actor_Movie.belongsTo(models.Movie, {
            foreignKey: "movie_id"
        });

        Actor_Movie.belongsTo(models.Actor, {
            foreignKey: "actor_id"
        });
    })

    return Actor_Movie;
};