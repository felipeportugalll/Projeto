const Usuario = require('../models/user.model'); //conectando controllers com model
const jwt = require("jsonwebtoken"); //token
const secret = "mysecret";

module.exports = {
    async index(req, res){
        const user = await Usuario.find(); //retorna todos os usuários
        res.json(user);
    },
    //para criar o primeiro cadastro
    //defino como async para a função esperar criar o usuário antes de passsar o status
    async create(req, res){
        const {user_name, user_email, user_type, user_password} = req.body;

        let data = {};
        //defino await onde eu quero que ele complete antes de seguir em frente
        let user = await Usuario.findOne({user_email}); //para verificar se o email já existe em models
        if(!user){
            data = {user_name, user_email, user_type, user_password};
            user = await Usuario.create(data); //caso não haja usuário, podemos criar um a partir daqui
            return res.status(200).json(user); //status de sucesso
        } else {
            return res.status(200).json(user); //status de erro no servidor
        }
    },
    //retorna apenas um usuário 
    async details(req,res){
        const {_id} = req.body;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req,res){
        const {_id} = req.body;
        const user = await Usuario.findByIdAndDelete({_id});
        res.json(user);
    },
    async update(req,res){
        const {_id, user_name, user_email, user_type, user_password} = req.body;
        const data = {user_name, user_email, user_type, user_password};
        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true});
        res.json(user);
    },
    async login(req, res) { 
        const {user_email, user_password} = req.body;
      
        try {
          const user = await Usuario.findOne({user_email});
          if (!user) {
            return res.status(200).json({status: 2, error: "Dados inválidos"});
          }
      
          const isMatch = await bcrypt.compare(user_password, user.user_password);
          if (!isMatch) {
            return res.status(200).json({status: 2, error: "Dados inválidos"});
          }
      
          const payLoad = {user_email};
          const token = jwt.sign(payLoad, secret, {
            expiresIn: "24h"
          });
          res.cookie("token", token, {httpOnly: true});
          res.status(200).json({status: 1, auth: true, token, id_client: user._id, userName: user.user_name, userType: user.user_type});
        } catch (err) {
          return res.status(500).json({status: 2, error: "Erro no servidor"});
        }
    },
    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401, msg:'Não autorizado'});
        }else{
            jwt.verify(token, secret, function(err){
                if(err){
                    req.json({status:401, msg:'Não autorizado'});
                }else{
                    res.jsom({status:200}) 
                }
            })
        }
    },
    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token', null,{httpOnly:true});
        }else{
            res.status(401).send("Logout não autorizado!")
        }
        res.send("Sessão finalizada com sucesso!");
    }
   
}