require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('MongoDB CONECTADO com sucesso!')
    }
    
});
mongoose.Promise = global.Promise;

module.exports = mongoose;