const path = require('path');
const moment = require('moment');

const {Actor, sequelize} = require('../database/models');
const {Op} = require('sequelize');

const actorsController = {

    list: async (req, res) => {
    try {
      const actorsList = await Actor.findAll({
        order: [['first_name','ASC']]
      });
      res.render('actors/list', {actorsList:actorsList, title: 'Lista de actores'})
    } catch (error) {
      console.log(error)
    }
    
    },

    rating: async (req,res) => {
      // let nroRating = req.params.id;
      try {
        let actorsList = await Actor.findAll(
          {
          where: {rating: {[Op.gte]: 8}},
          order: [['rating','DESC']]
          })
        res.render('actors/recommended', {actorsList:actorsList, title: 'Top Actores'})
      } catch (error) {
        console.log(error);
      }
    },

    detail: async (req, res) => {
      try {
        let actor = await Actor.findByPk(req.params.id)
        res.render('actors/detail', {actor:actor, moment:moment, title: actor.first_name + " " + actor.last_name});
      } catch (error) {
        console.log(error);
      }
    },

    // new: async (req,res) => {
    //   try {
    //     let actorsList = await Actor.findAll(
    //       {
    //         order: [["favorite_movie_id","DESC"]],
    //         limit: 5
    //       }
    //       )
    //     res.render('actors/new', {actorsList:actorsList, moment:moment})
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    
    searchResults: async (req,res) => {
      let datosBuscados = req.body;
      let ordenPor = Object.values(datosBuscados);
      let stringBuscado = ordenPor[0];
      switch (ordenPor[1]) {
          case "last_name":
            ordenPor = "apellido";
            break;
          case "rating":
            ordenPor = "rating";
            break;
          default:
            ordenPor = "";
          break;
      }
      
          
      if (!datosBuscados.order == "") {
          
          try {
            const actorsList = await Actor.findAll(
              {
                where: { 
                  [Op.or]:[{first_name: {[Op.like]: "%"+req.body.search + "%"}}, {last_name: {[Op.like]: "%"+datosBuscados.search + "%"}}]
                },
                order: [[''+datosBuscados.order+'','ASC']]
              }
            )
            // res.send(moviesJson)
            res.render('actors/search', {actorsList:actorsList, ordenPor:ordenPor, moment:moment, stringBuscado:stringBuscado, title: 'Resultados de búsqueda'})
          } catch (error) {
            console.log(error)
          }
        // res.send(datosBuscados.order)
      } else {
        try {
            const actorsList = await Actor.findAll(
              {
                where: { 
                  [Op.or]:[{first_name: {[Op.like]: "%"+req.body.search + "%"}}, {last_name: {[Op.like]: "%"+datosBuscados.search + "%"}}]
                },
                order: [['first_name','ASC']]
              }
            )
            // res.send(moviesJson)
            res.render('actors/search', {actorsList:actorsList, moment:moment, stringBuscado:stringBuscado, title: 'Resultados de búsqueda'})
          } catch (error) {
            console.log(error)
          }
        
      }
    }
        // .then((resultados) => {
        //   res.render('movies/list', {pelis:resultados})
        // })
};

module.exports = actorsController;