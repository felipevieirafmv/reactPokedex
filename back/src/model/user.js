const mongoose = require('mongoose');

const User = mongoose.model('User',
    new mongoose.Schema({
        login: {
            type: String,
            required: true,
            minLength: 3
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            minlength: 6
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        },
        removedAt: {
            type: Date,
            required: false
        },
        adm: {
            type: Boolean,
            required: false,
            default: false
        }
    })
)

module.exports = User