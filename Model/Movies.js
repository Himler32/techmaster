const mongoose = require('mongoose');

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title:{
        type: String,
    },
    category:{
        type: String,
    },
    country: String,
    year: Number,
    director_id: Schema.Types.ObjectId,
    imdb_score: Number,
    createAt:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('movie', MovieSchema);