const Message = require('../models/message');
const User = require('../models/user');

exports.createMessage = (req, res, next) => {
   
    const text = req.body.text;
    const id = req.userId;
    let creator;

    const message = new Message({
        text: text, 
        userId: id
    });
    message
        .save()
        .then(result => {
            return User.findById(id);
        })
        .then(user => {
            creator = user;
            user.messages.push(message);
            return user.save();
        })
        .then(user => {
            res.status(201).json({ 
                message: "Succesfully Created.",
                message: message
            });
        })
        .catch(err => {
            next(err);
        });
};

// api/users/:id/messages/:message_id
exports.getMessage = (req, res, next) => {
    const message = Message.findById(req.params.message_id);
    message
    .then(message => {
        if(!message) {
            let err = new Error('Messages not found');
            err.status = 404;
            throw err;
        }
        return res.status(200).json(message);
    })
    .catch(err => {
        next(err);
    });
};

exports.deleteMessage = (req, res, next) => {
    res.status(200).json({mess : 'hey'})
    Message
    .findById(req.params.message_id)
    .then(message => {
        console.log(req.params)
        if(!message) {
            const error = new Error('Message not found.');
            error.statusCode = 404;
            throw error;
        }
        return Message.remove(message._id);
    })
    .then(result => {
        return User.findById(req.userId);
    })
    .then(user => {
        user.messages.pull(req.params.message_id);
        return user.save();
    })
    .then(result => {
        return res.status(200).json({message: 'DELETED!'})
    })
    .catch(err => {
        return next(err);
    })
};

