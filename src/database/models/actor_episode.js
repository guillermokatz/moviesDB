const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Actor_Episode";
    let cols = {
        actor_id: DataTypes.INTEGER,
        episode_id: DataTypes.INTEGER
    };
    let config = {
        tableName: "actor_episode"
    };

    const Actor_Episode = sequelize.define(alias,cols,config);
    
    return Actor_Episode;
};