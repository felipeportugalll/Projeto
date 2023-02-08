const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //biblioteca para criptografia
const dataSchema = new mongoose.Schema({
    //Definindo os campos da collection
    user_name:{type: String, require:true, unique:true},
    user_email:{type: String},
    user_type:{type:Number, default:1},
    user_password:{type: String, require:true}
},
{
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

dataSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };

// dataSchema.methods.isCorrectPassword = function(password, callback){
//     bcrypt.compare(password, this.user_password, function(err,same){
//         if(err){
//             callback(err);
//         }else{
//             callback(err, same);
//         }
//     });
// }

//para exportar a module
const Users = mongoose.model('users', dataSchema);
module.exports = Users;