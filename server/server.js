const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const pinsRouter = require('./routes/pins.router');
const commentsRouter = require('./routes/comments.router');
const searchRouter = require('./routes/search.router');
const myPinsRouter = require('./routes/mypins.router')
const uploadRouter = require('./routes/upload.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
// pins route
app.use('/pins', pinsRouter);
// comments
app.use('/comments', commentsRouter);
// search route
app.use('/search', searchRouter);
// user pins router
app.use('/mypins', myPinsRouter);
// multer route
app.use('/upload', uploadRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});