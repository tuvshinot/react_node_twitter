const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const profileImageUrl = req.body.profileImageUrl;

    bcrypt
    .hash(password, 12)
    .then(hashedPw => {
        const user = new User({
            email : email,
            password : hashedPw,
            username : username,
            profileImageUrl : profileImageUrl
        });
        return user.save();
    })
    .then(result => {
        let token = jwt.sign({
            id : result._id,
            username : result.username,
            profileImageUrl : result.profileImageUrl
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token: token, userId: result._id.toString(), username:result.username});
    })
    .catch(err => {
        if(err.code == 11000) {
            err.message = 'Sorry, that user name and/or email is already taken!';
        }
        next({
            status : 400,
            message : err.message
        });
    })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    let user = User.findOne({ email : email});
    user
        .then(userFound => {
            loadedUser = userFound;
            return bcrypt.compare(password, userFound.password);
        })
        .then(isEqual => {
            if(!isEqual) {
                return next({
                    status : 400,
                    message : 'invalid Email/Password'
                })
            }
            let token = jwt.sign({
                id : loadedUser._id,
                username : loadedUser.username,
                profileImageUrl : loadedUser.profileImageUrl
            }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token: token, userId: loadedUser._id.toString(), username:loadedUser.username});
        })
        .catch(err => {
            return next({
                status : 400,
                message : 'invalid Email/Password'
            })
        })
};
