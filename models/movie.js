const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    movieDescription: { type: String, required: true },
    movieImg: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);