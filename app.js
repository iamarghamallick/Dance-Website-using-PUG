const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const app = express();
const port = 5000;

main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{res.send("Information saved successfully")}).catch(()=>{res.status(400).send("Failed to saved data")});
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
    console.log(`http://localhost:${port}`);
});