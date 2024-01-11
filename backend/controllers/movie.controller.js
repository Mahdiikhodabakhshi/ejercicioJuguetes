const MovieModel = require('../models/movie.model');
const movieController = {};


movieController.addMovie = async  (req,res) =>{
    const myMovie = new MovieModel(req.body);

    await  myMovie.save()
        .then(()=>{
            res.json({status : 'Movie inserted successfully'})
        })
        .catch(err => res.send(err.message))

}



movieController.getMovies= async (req,res) =>{
    const movies = await  MovieModel.find()
        .then((data) =>res.json(data))
        .catch((err) => console.error(err))
}

movieController.getMovie = async (req,res) =>{
    const movie = await MovieModel.findById(req.params.id)
        .then((data) =>{
            if (data != null) res.json(data)
            else res.json({status : 'Movie doesnt exist'})
        })
        .catch(err => console.error(err));
}

movieController.updateMovie = async (req,res)=>{
    const movie = req.body;
    await MovieModel.findByIdAndUpdate(
        req.params.id,
        {$set : movie},
        {new : true}   //para crear nueva peli si no existe

    )

        .then((data) =>{
            if (data!= null) res.json({status : 'movie successfully updated'})
            else res.json({status : ' movie does not existed'})
        })
        .catch(err => console.error(err));
}

movieController.deleteMovie = async (req,res) =>{
    await MovieModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data!= null) res.json({status : 'movie successfully deleted'})
            else res.json({status : ' movie does not existed'})
        })
        .catch(err => console.error(err));
}



movieController.getGenres = async (req ,res) =>{
    await MovieModel.find().distinct('genres')
        .then((data) =>{
             res.json(data)

        })
        .catch(err => console.error(err));
}

movieController.getMovieByName = async (req ,res) =>{
    await MovieModel.find({title : {$regex: req.params.title}})
        .then((data) =>{
            if (data != null) res.json(data)
            else res.json({status : 'Movie doesnt exist'})
        })
        .catch(err => res.json(err))
}


module.exports = movieController;