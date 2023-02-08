const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    movieDescription: { type: String, required: true },
    director: { type: String },
    cast: { type: String },
    opinions: { type: String },
    movieImg: {
        type: String,
        default: 'https://res.cloudinary.com/dtog0gwhc/image/upload/v1675559378/default-2_i3pis0.png'
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);