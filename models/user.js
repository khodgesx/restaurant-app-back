const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: { type: String, required: true },
    username: { type: String, unique: true, required: true, minlength: 2 },
    password: { type: String, required: true },
    img: { type: String, default:'https://i.imgur.com/Ccw5H8d.png' }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;