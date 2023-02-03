const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const path = require('path');
const mongoose = require('mongoose'); 
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000; //conecta ao app.listen 

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.set('strictQuery', true);
app.use(routes); //para poder conectar com o arquivo routes
mongoose.connect('mongodb://127.0.0.1:27017/projeto-tera', function(err){
    if(err){
       return console.error(err)
    }else{
        console.log('MongoDB conectado')
    }
});




 

//iniciando o servidor 

app.listen(port, function(){
    console.log('Server running on ' +port);
});

// const express = require('express')
// const app = express()
// const port = 5000

// app.use(express.json());

// app.post('/:id', (req, res) => {
//     console.log(req.body);
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


