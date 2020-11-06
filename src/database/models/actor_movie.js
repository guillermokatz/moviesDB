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
    
    return Actor_Movie;
};