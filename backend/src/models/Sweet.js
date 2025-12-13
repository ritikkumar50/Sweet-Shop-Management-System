const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Cakes', 'Chocolates', 'Pastries', 'Candies', 'Cookies', 'Ice Cream', 'Donuts', 'Macarons', 'Other']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add quantity'],
        min: [0, 'Quantity cannot be less than 0']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sweet', sweetSchema);
