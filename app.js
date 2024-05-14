require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('./src/conn.js');
const students = require('./src/db/studentdataschema.js');
const studentpass = require('./src/db/studentpassschema.js');
const { error } = require('console');


// use('collegeDB');
// const studentauthentications = require('./studentPasswordSchema.js');
const PORT = process.env.PORT || 5000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded()); // this is basically to decode data send through html page

const route = express.Router();
const frontend = path.join(__dirname, 'public');
console.log(frontend)


// Middleware for parsing request body
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static(frontend));


// Middleware for logging requests

const reqFilter = (req,resp,next) =>{
    // console.log(`Request made to ${req.url} with method ${req.method}`);
    next();
}

app.use(reqFilter);
//API GET ROUTS 
app.get('',(req,resp)=>{
    resp.sendFile(`${frontend}/index.html`);
})
app.get('/about', (req,resp) =>{
    resp.sendFile(`${frontend}/html/about.html`);
});
app.get('/contact', (req,resp) =>{
    resp.sendFile(`${frontend}/html/contact.html`);
});
app.get('/help', (req,resp) =>{
    resp.sendFile(`${frontend}/html/help.html`);
});
app.get('/blog', (req,resp) =>{
    resp.sendFile(`${frontend}/html/blog.html`);
});
app.get('/courses', (req,resp) =>{
    resp.sendFile(`${frontend}/html/courses.html`);
});
app.get('/studentlogin', (req,resp) =>{
    resp.sendFile(`${frontend}/html/stdntlgn.html`);
});
app.get('/student-signup', (req,resp) =>{
    resp.sendFile(`${frontend}/html/signup.html`);
});
app.get('/register', (req,resp) =>{
    resp.render(`registration`); //rendering registration.ejs file
});
app.get('/forgotpassword', (req,resp) =>{
     resp.render(`forgotpass`); //rendering forgotpass.ejs file
});
app.get('/home', (req,resp) =>{
     resp.render(`home`); //rendering home.ejs file
});
app.get('/deshboard', (req,resp) =>{
     resp.render(`deshboard`); //rendering deshboard.ejs file
});
app.get('/attendance', (req,resp) =>{
     resp.render(`attendance`); //rendering attendance.ejs file
});
app.get('/user', (req, res) => {
    // Replace with logic to get user data based on session or login
    const user = users[0];
    res.render('user', { user: user, announcements: announcements });
  });



// .......................Node.js code to handle form submissions and save data to MongoDB:................................


app.post('/register', async (req, res) => {
    let studentdata = new students(req.body);
    console.log(studentdata);
    let result = await studentdata.save();
    // Render the registration success page with the registration number
    // res.render('registration', { RegistrationNo: studentdata.RegistrationNo });
});
app.post('/update', async (req, res) => {
    const username = req.body.username;
    const user = await studentpass.findOne({username});
    if (user) {
        res.status(409).json({ error: "User exist redirecting to login page" });
    }else{
        let studentPassword = new studentpass(req.body);
    let result = await studentPassword.save();
    res.status(200).json({ message: "Password updated redirecting to login page" });
    // Render the registration success page with the registration number
    // res.render('registration', { RegistrationNo: studentdata.RegistrationNo });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists in the database
        const user = await students.findOne({username});
// console.log(user.password === password && user.username == username);

        if (user) {
            if(user.username == username && user.password === password){
            // User found, grant access to home page
            res.status(200).json({ message: "Login successful" , redirectTo: "/home"});
            }else if(user.username == username && user.password !== password){
               
                // Password does not match, return error message
                res.status(401).json({ error: "Wrong password" });
            }else {
                // User not found, return error message
                res.status(404).json({ error: "User not found" });
            }
        } 
    } catch (error) {
        // Error occurred during database query
        res.status(500).json({ error: "Internal server error" });
    }
});

// ........................................................................................

// Replace with your database connection and data fetching logic
const users = [
  {
    name: "John Doe",
    studentID: "123456",
    email: "john.doe@college.edu",
    program: "Computer Science",
    classes: [
      { code: "CSC101", name: "Introduction to Programming", day: "M/W/F", time: "10:00 AM" },
      { code: "MATH120", name: "Calculus I", day: "T/Th", time: "2:00 PM" },
    ],
  },
];

const announcements = [
  { title: "Important Update: Online Exam Schedule", date: "2024-05-10", message: "The online exam schedule for the upcoming semester has been released. Please check your email for details." },
  { title: "Library Resources for Research Projects", date: "2024-05-08", message: "The library offers a wide range of resources for your research projects. Attend our workshop on effective research strategies on May 15th." },
];


// Start the servern
app.use('/',route);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// ---------FOLDER STRUCTURE -------

// EDUFOLDER/
// │
// ├
// │
// ├── Server/            (Backend-related code)
// │   ├── node_modules/  (Auto-generated by npm/yarn)
// │   ├── src/           (Backend source code)
// │   │   ├── db/        (Database related files)
// │   │   ├── models/    (Database models)
// │   │   └── app.js     (Main backend file)
// │   |   |___ config.js (Database configuration)
// │   |   |___ studentdataschema.js (Schema for student data)
// │   ├── .gitignore     (Git ignore file for backend)
// │   ├── package.json   (Backend dependencies and scripts)
// │   └── ...            (Other backend-related files)
// │
// └── src/               (Frontend-related code)
// |    ├── frontend/      (Frontend source code)
// |    │   ├── API/       (API related files)
// |    │   ├── images/    (Images used in frontend)
// |    │   ├── html/      (HTML files for frontend)
// |    │   ├── css/       (CSS stylesheets)
// |    │   └── index.js   (Entry point for frontend)
// |    ├── .gitignore     (Git ignore file for frontend)
// |    ├── package.json   (Frontend dependencies and scripts)
// |    └── ...            (Other frontend-related files)
// |
// ├──  views/            (EJS files)