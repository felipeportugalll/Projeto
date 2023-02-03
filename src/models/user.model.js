const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //biblioteca para criptografia
const dataSchema = new mongoose.Schema({
    //Definindo os campos da collection
    user_name:String,
    user_email:String,
    user_type:{type:Number, default:1},
    user_password:String,
},{
    //para data de criação do usuário e sua possível atualização
    timestamps:true
});

//criptografando antes de salvar a senha
dataSchema.pre('save', function(next){
    if(!this.isModified("user_password")){
        return next();
    }
    this.user_password = bcrypt.hashSync(this.user_password,10);
    next();
});

//criptografando senha após update
dataSchema.pre('findOneAndUpdate', function(next){
    let password = this.getUpdate().user_password+'';
    if(password.length<55){
        this.getUpdate().user_password = bcrypt.hashSync(password,10);
    }
    next();
});

//para exportar a module
const users = mongoose.model('users', dataSchema);
module.exports = users;