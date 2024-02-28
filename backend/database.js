const mongoose = require('mongoose');
const URL =USER DATABASE ADDRESS

mongoose.connect(URL)
.then(db => console.log('db connected ' ))
.catch(err => console.error(err))


module.exports = mongoose;
