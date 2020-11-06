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
    
    return Actor;
};