/*The below JavaScript functions hideMenu and showMenu control the visibility of a navigation menu by
  adjusting its right position.*/

var navlinks = document.getElementById('navlinks');
function hideMenu(){
    navlinks.style.right = "-260px";
}
function showMenu(){
    navlinks.style.right ="0";
}

// .....................................................................................................
/* This part of the code is handling form navigation functionality. It selects elements from the DOM
related to a form, such as next, back, and submit buttons, as well as all input fields within the
form. */

const form = document.querySelector('form');
const nextbtn = form.querySelector('.nextbtn');
const backbtn = form.querySelector('.backbtn');
const submitbtn = form.querySelector('.submit');
const allInput = form.querySelectorAll('.first input');



nextbtn.addEventListener('click', () => {
    allInput.forEach(input => {
        if (input.value != "") {
            form.classList.add('secActive');
        } else {
            form.classList.remove('secActive');
        }
    });
});
backbtn.addEventListener('click', () => {
    form.classList.remove('secActive');
    });

/* This part of the code is handling form submission functionality. It selects the form element from the
DOM and adds an event listener to the submit button. When the submit button is clicked.*/

submitbtn.addEventListener('click', () => {
    const formData = {
         // element is selected by its name attribute and its value is stored in the formData object.
        FullName: document.querySelector('input[name="FullName"]').value,
        DOB: document.querySelector('input[name="DOB"]').value,
        Email: document.querySelector('input[name="Email"]').value,
        PhoneNumber: document.querySelector('input[name="PhoneNumber"]').value,
        Gender: document.querySelector('input[name="Gender"]').value,
        BloodGroup: document.querySelector('input[name="BloodGroup"]').value,
        Course: document.querySelector('input[name="Course"]').value,
        Branch: document.querySelector('input[name="Branch"]').value,
        year: document.querySelector('input[name="year"]').value,
        RegistrationNo: document.querySelector('input[name="RegistrationNo."]').value,
        RollNo: document.querySelector('input[name="RollNo."]').value,
        Session: document.querySelector('input[name="Session"]').value,
        villcityName: document.querySelector('input[name="villcityName"]').value,
        District: document.querySelector('input[name="District"]').value,
        PO: document.querySelector('input[name="PO"]').value,
        PS: document.querySelector('input[name="PS"]').value,
        State: document.querySelector('input[name="State"]').value,
        Nationality: document.querySelector('input[name="Nationality"]').value,
        FatherName: document.querySelector('input[name="FatherName"]').value,
        FatherOccupation: document.querySelector('input[name="FatherOccupation"]').value,
        FatherAnnualncome: document.querySelector('input[name="FatherAnnualncome"]').value,
        MotherName: document.querySelector('input[name="MotherName"]').value,
        MotherOccupation: document.querySelector('input[name="MotherOccupation"]').value,
        MotherAnnualIncome: document.querySelector('input[name="MotherAnnualIncome"]').value
    };

  /* The code snippet you provided is using the `fetch` API in JavaScript to make a POST request to the
      register' endpoint on the server.*/

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response from the server
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

// ......................................loginpage..........................................



