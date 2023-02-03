const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const path = require('path');
const mongoose = require('mongoose'); 
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000; //conecta ao app.listen 

mongoose.set('strictQuery', true);
app.use(routes); //para poder conectar com o arquivo routes
mongoose.connect('mongodb://127.0.0.1:27017/projeto-tera', function(err){
    if(err){
       return console.error(err)
    }else{
        console.log('MongoDB conectado')
    }
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());


 

//iniciando o servidor 

app.listen(port, function(){
    console.log('Server running on ' +port);
});


