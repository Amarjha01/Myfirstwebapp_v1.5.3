const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
    // RegistrationNo: Number,
    // Password: String,
    username: Number,
    password: String,
});

module.exports = mongoose.model('studentauthentications', userSchema);
module.exports(userSchema); // this is the schema for the student password