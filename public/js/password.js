document.addEventListener('DOMContentLoaded', () => {
    const nxtbtn = document.querySelector('#nxtbtn');

    nxtbtn.addEventListener('click', (event) => {
        event.preventDefault();
        // Get the values of username, password, and confirm password
        // elements selected by their class names
        const username = document.querySelector('.username input').value;
        const password = document.querySelector('.password input').value;
        // elements selected by their name attributes
        const confirmpassword = document.querySelector('input[name="cpassword"]').value;

        // Create an object to store student password data
        const studentPassword = {
            username: username,
            password: password
        };

        // Check if any field is empty
        if (username === "" || password === "" || confirmpassword === "") {
            alert('Please fill in all fields');
        } else if (password !== confirmpassword) {
            alert('Passwords do not match');
        } else {
         // Send student password data to the server for updating
            fetch('/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentPassword)
            })
            .then(response => response.json())
            // .then(response => {
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // return response.json();
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                      // Redirect to the login page
                    window.location.href = '/studentlogin';
                    } else if (data.error) {
                        alert(data.error);
                        // Redirect to the login page
                    window.location.href = '/studentlogin';
                    }
    
                })
            // })
            
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
        
        
    }); 
});

