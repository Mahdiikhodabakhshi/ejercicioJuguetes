
const gameModel = require('../models/juguete.model');
const gameController = [];



gameController.getAll = async (req , res ) =>{
    const pageSize = req.params.size ;
    const skip = (req.params.page -1)*pageSize;
    const juguetes = await gameModel.find().limit(pageSize).skip(skip)
        .then((data) =>{
            res.json({info:{page: req.params.page,pageSize:pageSize},results:data})
        })
        .catch((err) => res.send(err.text))
}


gameController.getOne = async (req ,res) =>{
    const juegute = await gameModel.findById(req.params.id)
        .then((data) =>{
            if (data != null) res.json(data)
            else res.status(404).json({status : 'game doesnt exist'})
        })
        .catch((err) => res.send(err))
}

gameController.getCategorias= async (req , res) =>{
    await gameModel.find().distinct('categoria')
        .then((data) =>{
            res.json(data)
        })
        .catch(err => console.error(err));

}

gameController.addGame = async (req , res) =>{

    const newGame = new gameModel(req.body);
    await newGame.save()
        .then(() =>{res.status(201).json({status : 'Game inserted successfully '})})
        .catch(err => res.send(err.message))


}

gameController.updateGame = async (req , res) =>{
    const game = req.body;
    await gameModel.findByIdAndUpdate(
        req.params.id,
        {$set : game},
        {new : true}
    )
        .then((data) =>{
            if (data!= null) res.json({status : 'Game successfully updated'})
            else res.json({status : ' Game does not existed'})
        })
        .catch(err => console.error(err));
}

gameController.deleteGame = async (req ,res) =>{
    await gameModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data!= null) res.json({status : 'Game successfully deleted'})
            else res.status(404).json({status : ' Game does not existed'})
        })
        .catch(err => console.error(err));
}

gameController.getByName = async (req , res ) =>{
    const juguetes = await gameModel.find({nombre : {$regex: req.params.name}})
        .then((data) =>{
           if (data != null) res.json(data);
           else res.json({status: 'Juguete no se e ncontrado'})
        })
        .catch((err) => res.send(err.text))
}


module.exports = gameController;