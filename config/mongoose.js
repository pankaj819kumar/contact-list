const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/contacts_list_db');
}

// checking if connection is successfull or not
main().then(function () {
    console.log("connected to database successfully");
}).catch(function (err) {
    console.error('error connecting to database', err);
});