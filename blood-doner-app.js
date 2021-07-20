const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const donerRoutes = require('./emp_routes');
// dotenv.config({ path: './config.env' });

mongoose.connect('mongodb+srv://Subhodip11:2X7CtbjLRuNCZAPU@walmartcluster.qcmkn.mongodb.net/bloodDonationWebApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

app.use(methodOverride('_method'));
app.set(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use(donerRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const port = process.env.PORT || 1153;
app.listen(port, () => {
    console.log('Server started listening at 1153');
})