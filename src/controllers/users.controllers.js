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
        console.log(req.body);
        const {user_name, user_email, user_type, user_password} = req.body;

        let data = {};
        //defino await onde eu quero que ele complete antes de seguir em frente
        let user = await Usuario.findOne({user_email}); //para verificar se o email já existe em models
        if(!user){
            data = {user_name, user_email, user_type, user_password};
            user = await Usuario.create(data); //caso não haja usuário, podemos criar um a partir daqui
            return res.status(200).json(user); //status de sucesso
        } else {
            return res.status(500).json(user); //status de erro no servidor
        }
    },
    //retorna apenas um usuário 
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req,res){
        const {_id} = req.params;
        const user = await Usuario.findByIdAndDelete({_id});
        res.json(user);
    },
    async update(req,res){
        const {_id, user_name, user_email, user_type, user_password} = req.body;
        const data = {user_name, user_email, user_type, user_password};
        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true});
        res.json(user);
    },
    async login(req,res){
        const email = req.body;
        Usuario.findOne({user_email:email, user_type:1}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({erro: "Erro no servidor"});
            }else if(!user){
                res.status(200).json({status:2, erro: "Dados inválidos"})
            }else{
                const payLoad = {email};
                const token = jwt.sign(payLoad, secret, {
                    expiresIn: "24h"
                })
                res.cookie('token', token, {httpOnly:true});
                res.status(200).json({status:1, auth:true, token:token, id_client: user._id, userName: user.user_name})
            }
        })
    }
}