const mongoose = require('mongoose');
module.exports = () =>{
    mongoose.connect(
        'mongodb+srv://Ibrokhim:IbrohimbekTuraboyev@cluster0.o5uav.mongodb.net/test',
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    );
};

const db = mongoose.connection;

 db.on('open', ()=>{
     console.log("MONGODB GA GLOBAL ULANDIK");
 });
 db.on('error', (err)=>{
     console.log(err);
 });