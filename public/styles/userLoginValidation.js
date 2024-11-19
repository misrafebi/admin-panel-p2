document.getElementById('user-register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation checks
    if (username === '' || password === '' ) {
        swal("All fields are required!");
        return false; // Stop further execution
    } 
    
   

    // If all validations pass, submit the form programmatically
    this.submit();
});
