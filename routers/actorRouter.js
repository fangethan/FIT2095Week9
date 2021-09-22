var Actor = require('../models/actorSchema');
var Movie = require('../models/movieSchema');

const mongoose = require('mongoose');

module.exports = {
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            console.log('created new actor');
            res.json(actor);
        });
    },

    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },


    // Delete an actor and all its movies
    deleteActorMovie: function (req, res) {
        Movie.deleteMany({ actors: req.params.actorid }, function (err, doc) {
            console.log(doc)
        });

        Actor.findOneAndRemove({ _id: req.params.actorid }, function (err, actor) {
            actor.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actor);
            });
        });
    },

    // Remove a movie from the list of movies of an actor
        // Example: http://localhost:8080/actors/1234/987
        // where 1234 is the actor's ID
        // and 987 is the movie's ID
    deleteMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.movieid}, function (err, doc) {
                if (err) return res.status(400).json(err);
                if (!doc) return res.status(404).json();

                actor.movies.remove(doc._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },


    // The current implementation of getAll actors function retrieves the list of actors,
    // where each actor has an array of IDs that represents his/her movies.
    // Update the implementation such that the array of movies should contain
    // the details of the movies instead of IDs.
    getAllMovies: function (req, res) {
        Actor.find({})
            .populate('movies')
            .exec(function (err, movies) {
                if (err) return res.json(err);
                if (!movies) return res.json();
                res.json(movies);
            });
    },

    aveMovies: function (req, res) {
        // actors/avgmovies
        // ave number of movies for all actors
        var totalMovies = 0;
        var totalActors = 0;
        var avgMovies = 0;
        Actor.find({},function (err, list) {
                if (err) return res.json(err);
                if (!list) return res.json();
                totalActors = list.length;
                console.log('Total Actors: ' + totalActors)
            for (let i = 0; i < list.length; i++) {
                totalMovies += list[i].movies.length;
                console.log('Total Movies: ' + totalMovies);
            }

            avgMovies = totalMovies / totalActors;
            console.log('Avg Movies: ' + avgMovies)
            res.json({avgMovies})

        });
    },

    updateOne: function (req, res) {
      Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
      });
    },

  deleteOne: function (req, res) {
    Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.json();
    });
  },


}

