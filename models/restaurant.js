const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    visited: { type: Boolean, required: true},
    cuisine: String,
    img: String,
    faveDish: String,
    notes: String,
    priceLevel: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Recipe = mongoose.model('Restaurant', restaurantSchema);

module.exports = Recipe;