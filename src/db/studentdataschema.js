/* This JavaScript code is defining a Mongoose schema for student data. Here's a breakdown of what each
part of the code is doing: */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const userSchema = new Schema({
//     // RegistrationNo: Number,
//     // Password: String,
//     username: Number,
//     password: String,
// });

// module.exports = mongoose.model('studentauthentications', userSchema);
// module.exports(userSchema); // this is the schema for the student password

const studentdataschema = new Schema({
    FullName: String,
    DOB: Date,
    Email: String,
    PhoneNumber: Number,
    Gender: String,
    BloodGroup: String,
    Course: String,
    Branch: String,
    year: Number,
    RegistrationNo: Number,
    RollNo: Number,
    Session: String,
    villcityName: String,
    District: String,
    PO: String,
    PS: String,
    State: String,
    Nationality: String,
    FatherName: String,
    FatherOccupation: String,
    FatherAnnualIncome: Number,
    MotherName: String,
    MotherOccupation: String,
    MotherAnnualIncome: Number,
});

module.exports = mongoose.model('students', studentdataschema);

module.exports(studentdataschema); // this is the schema for the student data