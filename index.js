const express = require('express');
const port = 8000;
const path = require('path');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
           console.log("error in fetching contacts ", err);
            return;
        }
        return res.render('home', {
            title: "Contact List",
            contact_list : contacts
        });
    });
});

app.post('/create-contact', function (req, res) { 
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("error in creating a document ", err);
            return;
        }
    });
    return res.redirect('back');
});

app.get('/delete-contact/', function (req, res) {
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');  
    })
});

app.listen(port, function (err) {
    console.log("express server is running on port:", port);
})