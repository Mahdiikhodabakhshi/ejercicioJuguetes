const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
        nombre : {type : String , required : true},
        edadMinima : {type : Number , required: true},
        precio : {type : Number , required : true},
        categoria : {type : String , required : true}
})



module.exports = mongoose.model('game' , gameSchema , 'games');