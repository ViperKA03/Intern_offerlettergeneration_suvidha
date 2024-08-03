// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginStatus = document.getElementById('loginStatus');

    // Set session timeout (e.g., 5 minutes)
    const SESSION_TIMEOUT = 10 * 60 * 1000; // 5 minutes in milliseconds
    let sessionTimeout;

    // Check if user is already logged in
    if (sessionStorage.getItem('sessionToken')) {
        redirectToIndex();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let valid = true;

        // Clear previous errors
        usernameError.textContent = '';
        passwordError.textContent = '';
        loginStatus.textContent = '';

        // Validate username
        if (username.value.trim() === '') {
            usernameError.textContent = 'Username is required.';
            valid = false;
        }

        // Validate password
        if (password.value.trim() === '') {
            passwordError.textContent = 'Password is required.';
            valid = false;
        }

        // If valid, handle login
        if (valid) {
            const isAuthenticated = authenticateUser(username.value, password.value);

            if (isAuthenticated) {
                const sessionToken = generateSessionToken();
                sessionStorage.setItem('sessionToken', sessionToken);
                loginStatus.textContent = 'Login successful!';
                loginStatus.style.color = 'green';
                setTimeout(redirectToIndex, 500); // Delay to show the success message
                startSessionTimer();
            } else {
                loginStatus.textContent = 'Invalid username or password.';
                loginStatus.style.color = 'red';
            }
        }
    });

    function authenticateUser(username, password) {
        // Replace with real authentication logic
        const validUsername = 'user';
        const validPassword = 'password';
        return username === validUsername && password === validPassword;
    }

    function generateSessionToken() {
        // Generate a simple token (in production, use a secure method)
        return btoa(Date.now() + ':' + Math.random());
    }

    function startSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(logout, SESSION_TIMEOUT);
    }

    function logout() {
        sessionStorage.removeItem('sessionToken');
        window.location.href = 'login.htm'; // Redirect to login page
    }

    function redirectToIndex() {
        window.location.href = 'index.htm'; // Redirect to index.html
    }
});
