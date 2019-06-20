const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const Signature = require('./models/signatureSchema.js');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

const url =  process.env.MONGOLAB_URI;
mongoose.connect(url, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'client/build'))); 

// Get all signatures.
app.get('/api/signatures', function(req, res) {
    Signature.find({}).sort({date: 'desc'}).then(eachOne => {
      res.json(eachOne);
    })
});
  
// Post a new signature.
app.post('/api/signatures', function(req, res) {
    Signature.create({
      guestSignature: req.body.SignatureOfGuest,
      message: req.body.MessageofGuest,
      rating: req.body.NoOfStars,
      date: new Date()
    }).then(signature => {
      res.json(signature)
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = (process.env.PORT || 2019);
app.listen( port, () => {
	console.log('Server started on port',port);
});
  