const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./database');
const {json} = require('express');

const gameRoute = require('./routs/juegutes.route')



//setting

app.set('port' , process.env.PORT || 3000 );



// Middleware

app.use(morgan('dev'));
app.use(cors("http://localhost:4200"));
app.use(express.json());


//routes

app.use('/api/movies' , require('./routs/movie.route'));

app.use('/api/games' , gameRoute);

app.use('/' , (req ,res) => res.send('Movies esta en /api/movies y Games esta en /api/games'));

// start the server

app.listen(app.get('port') , () => {
    console.log('server on port: ' , app.get('port'));
})