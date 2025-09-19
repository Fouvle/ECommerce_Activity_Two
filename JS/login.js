$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        let email = $('#email').val();
        let password = $('#password').val();

        // Regex for email validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || password === "") {
            alert('Email and password fields cannot be empty.');
            return;
        } else if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        } else if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // sending data asynchronously 
        $.ajax({
            url: '/actions/login_customer.php',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                if (response === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: response.message,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirect user (dashboard/homepage based on role)
                            if (response.role === 'admin') {
                                window.location.href = 'admin_dashboard.php';
                            } else {
                                window.location.href = 'index.php';
                            }
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: response.message,
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred! Please try again later.',
                });
            }
        });
    });
});
