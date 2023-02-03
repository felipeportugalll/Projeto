const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/users.controllers');


routes.get('/', Usuario.index);

//Rotas de usuários
routes.post('/api/users', Usuario.create); 
routes.get('/api/users', Usuario.index); //chamo a função index de users.controllers
routes.get('/api/users.details/:_id', Usuario.details);
routes.delete('/api/users/:_id', Usuario.delete);
routes.put('/api/users', Usuario.update);
routes.post('/api/users/login', Usuario.login); 


module.exports = routes;