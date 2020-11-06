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
    
    return Movie;
};