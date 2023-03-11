const express = require("express");
const path = require("path");

const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', { useNewUrlParser: true });
const port = 80;
var contactSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    address: String,
    concern: String
});
var Contact = mongoose.model('Contact', contactSchema);



const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/contactDancee', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB database'))
  .catch(error => console.log(error));

// Define a schema for the email model
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Define the email model using the schema
const email = mongoose.model('Email', emailSchema);

// Use body-parser middleware to parse request body as JSON
app.use(bodyParser.json());

// Handle POST request to save email to database
app.post('/save-email', (req, res) => {
  let email = req.body.email; // Get email from request body

  // Validate email format using regular expression
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Email is invalid, send error response
    return res.status(400).send({ success: false, message: 'Invalid email address' });
  }

  // Create new email document and save to database
  const newEmail = new Email({ email });
  newEmail.save()
    .then(() => {
      // Email saved successfully, send success response
      res.status(200).send({ success: true, message: 'Email saved successfully' });
    })
    .catch(error => {
      // Error occurred while saving email, send error response
      res.status(500).send({ success: false, message: 'Error saving email to database' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


app.use('/static', express.static('static'))
app.use(express.urlencoded())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about',(req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
  })
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    })
    //res.status(200).render('contact.pug');
})
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`);
});
