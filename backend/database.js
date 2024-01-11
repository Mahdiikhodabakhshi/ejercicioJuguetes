const mongoose = require('mongoose');
const URL ='mongodb+srv://root:root@prueba01.zn6z2sp.mongodb.net/DWECPeliculas?retryWrites=true&w=majority';

mongoose.connect(URL)
.then(db => console.log('db connected ' ))
.catch(err => console.error(err))


module.exports = mongoose;