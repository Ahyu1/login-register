const express = require("express");
const mysql = require("mysql");
//const dotenv = require('dotenv');
const path = require('path');
//const hbs = require('hbs');

const app = express();

//dotenv.config({path: './.env'});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tryDB'
    /*
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,rs
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    */
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//sent by html codes
app.use(express.urlencoded({extended: false}));
//sent by api

app.use(express.json());

app.set('view engine', 'hbs')

db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("mysql connected...");
    }
})

/*
app.get('/', (req, res) =>{
    //res.send('hagdf')
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
})

*/
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});