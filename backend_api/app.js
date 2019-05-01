require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8081;
const MONGODB_URI = 'clasterUserName/warbler';
const mongoose = require('mongoose');
const errorHandler = require('./handlers/error');

// middleware
const isAuth = require('./middleware/isAuth');
const LoginRequired = require('./middleware/loggedIn');

// routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const messagesRoutes = require('./routes/messagesAll');


app.use(cors());
app.use(bodyParser.json());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', isAuth, messageRoutes);
app.use('/api/messages', LoginRequired, messagesRoutes);

// page not found, previous routes not found any then this will run
app.use((req, res, next) => {
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
});

// get any next(err)
app.use(errorHandler);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        const server = app.listen(PORT, () => {
            console.log('app is running on port 8081');
        });
        console.log('Mongoose Connected...');
    })
    .catch(err => console.log(err));

