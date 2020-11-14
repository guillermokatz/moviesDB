const path = require('path');
const moment = require('moment');
const { validationResult } = require('express-validator');

const {Actor, Movie, Actor_Movie, sequelize} = require('../database/models');
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
        let actor = await Actor.findByPk(req.params.id, {include: ["favorite_movie", "peliculas"]})

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
    },

    create: async (req, res) => {
      
      try {
        const peliculasFav = await Movie.findAll({
          order: [['title','ASC']]
        });
        res.render('actors/create_actor', {title: 'Crear actor', peliculasFav: peliculasFav});

      } catch (error) {
        console.log(error)
      }
    },

    processCreate: async (req, res) => {
      const errors = validationResult(req);
      
      const peliculasFav = await Movie.findAll({
        order: [['title','ASC']]
      });

      if (errors.isEmpty()) {     
        try {
          await Actor.create(req.body);
          res.redirect('/actors');
        } catch (error) {
          console.log(error)
        }      
      }
      else {
        const old = req.body;
        res.render('actors/create_actor', {title: 'Crear actor', peliculasFav: peliculasFav, errors: errors, old: old});
      }
    },

    edit: async (req, res) => {
      try {
        const actor = await Actor.findByPk(req.params.id, {
          include:['favorite_movie']
        });

        const peliculasFav = await Movie.findAll({
          order: [['title','ASC']]
        });

        res.render('actors/edit_actor', {actor: actor, peliculasFav: peliculasFav, title: "Editar " + actor.first_name + " " + actor.last_name});

      } catch (error) {
        console.log(error)
      }
    },

    processEdit: async (req, res) => {
      const errors = validationResult(req);
      
      const actor = await Actor.findByPk(req.params.id, {
        include:['favorite_movie']
      });

      const peliculasFav = await Movie.findAll({
        order: [['title','ASC']]
      });
      
      if (errors.isEmpty()) {
        try {
        await Actor.update(req.body, {
          where: {id: req.params.id}
        });
        res.redirect('../../actors/');

        } catch (error) {
          console.log(error)
        };
      } else {
        const old = req.body;
        res.render('actors/edit_actor', {actor: actor, peliculasFav: peliculasFav, title: "Editar " + actor.first_name + " " + actor.last_name, errors: errors, old: old});
      }
    },

    delete: async (req, res) => {
      await Actor.destroy({
        where: {id: req.params.id}
      });

      res.redirect('/actors');
    },

    createAct: async (req, res) => {
      
        try {
          const peliculas = await Movie.findAll({
            order: [['title','ASC']]
          });

          const actores = await Actor.findAll({
            order: [['first_name', 'ASC']]
          });

          res.render('actors/createAct', {title: 'Crear actuación', peliculas, actores});
  
        } catch (error) {
          console.log(error)
        }
      
    },
    
    processCreateAct: async (req, res) => {
      
      try {
        await Actor_Movie.create(req.body);
          res.redirect('/actors');

      } catch (error) {
        console.log(error)
      }
    
  }



        // .then((resultados) => {
        //   res.render('movies/list', {pelis:resultados})
        // })
};

module.exports = actorsController;