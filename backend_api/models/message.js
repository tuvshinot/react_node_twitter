const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required:true,
        maxlength :160
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
}, {
    timestamps : true
});


module.exports = mongoose.model('Message', messageSchema);