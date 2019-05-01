const Message = require('../models/message');
const User = require('../models/user');

exports.getMessages = (req, res, next) => {
    Message
        .find()
        .sort({createdAt : 'desc'})
        .populate("userId", {
            username:true,
            profileImageUrl : true
        })
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            next(err);
        });
};


