const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique : true
    },
    username: {
        type: String,
        required:true,
        unique : true
    },
    password: {
        type: String,
        required:true,

    },
    profileImageUrl : {
        type : String
    },
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Message'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);