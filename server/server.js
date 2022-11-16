const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// bring in multer 
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const pinsRouter = require('./routes/pins.router');
const commentsRouter = require('./routes/comments.router')
const multerRouter = require('./routes/multer.router');

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
app.use('/comments', commentsRouter)
// multer route
app.use('/api/multer', multerRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
