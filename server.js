const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const order = require('./routes/api/order');
const auth = require('./routes/api/auth');
const product = require('./routes/api/product');
const adminOrder = require('./routes/api/adminOrder');
const payment = require('./routes/api/payment');
const app = express();
// DB Config
const db = require('./config/keys.json').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
  console.log("Database Connected");
});

// Init Middleware
app.use(express.json({extended: false}));


app.get('/', (req, res) => res.send('Hello World'));

// User Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/order', order);
app.use('/api/adminorder', adminOrder);
app.use('/api/razorpay', payment);
// Admin Routes
app.use('/api/product', product);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
