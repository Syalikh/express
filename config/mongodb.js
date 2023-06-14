const mongoose = require('mongoose');

const conncetDB = async () =>{
    try{
    await mongoose.connect('mongodb://127.0.0.1:21017/mongodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('koneksi ke mongodb berhasil');
    }catch(err) {
        console.log(err);
    }
};



module.exports = conncetDB;