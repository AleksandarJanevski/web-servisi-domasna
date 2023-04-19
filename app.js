const express = require('express');
const morgan = require('morgan');
const db = require('./pkg/database/index');
const carHandler = require('./handlers/carHandler');
const userHandler = require('./handlers/userHandler')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

db.init()

app.get('/api/v1/getcars', carHandler.verify, carHandler.getCars);
app.post('/api/v1/create-user', userHandler.createUser);
app.post('/api/v1/login', userHandler.loginUser);
app.post('/api/v1/addcar', carHandler.addCars);

app.listen(process.env.PORT, err => {
    if (err) return console.error(err);
    console.log('Service Online');
})
