const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: validator.isEmail,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;