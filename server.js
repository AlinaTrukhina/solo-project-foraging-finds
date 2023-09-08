const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./server/modules/session-middleware');
const passport = require('./server/strategies/user.strategy');

// Route includes
const userRouter = require('./server/routes/user.router');
const pinsRouter = require('./server/routes/pins.router');
const commentsRouter = require('./server/routes/comments.router');
const searchRouter = require('./server/routes/search.router');
const myPinsRouter = require('./server/routes/mypins.router')
const uploadRouter = require('./server/routes/upload.router');

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
// app.use(express.static('build'));
app.use("/", express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});