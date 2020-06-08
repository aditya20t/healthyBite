const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const order = require('./routes/api/order');
const auth = require('./routes/api/auth');

const app = express();

// DB Config
const db = require('./config/keys.json').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("Database Connected");
});

// Init Middleware
app.use(express.json({extended: false}));


app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/order', order);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
