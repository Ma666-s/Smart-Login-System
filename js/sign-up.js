document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('upNameId');
    const emailInput = document.getElementById('upEmailId');
    const passwordInput = document.getElementById('upPassId');
    const togglePassword = document.querySelector('.toggle-password');
    const themeToggle = document.getElementById('themeToggle');
    
    // Initialize accounts array from localStorage or create empty array
    let accounts = JSON.parse(localStorage.getItem('accountsRegistered')) || [];
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Dark Mode';
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
        }
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });
    
    // Registration function
    function handleRegistration() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Input validation
        if (!name || !email || !password) {
            showAlert('error', 'Please fill in all fields');
            return;
        }
        
        if (!validateName(name)) {
            showAlert('error', 'Name should contain only letters and spaces');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('error', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showAlert('error', 'Password must be at least 8 characters long');
            return;
        }
        
        // Check if email already exists
        if (isEmailRegistered(email)) {
            showAlert('error', 'This email is already registered');
            return;
        }
        
        // Create new account
        const newAccount = {
            registerName: name,
            registerEmail: email,
            registerPassword: password
        };
        
        // Add to accounts array and update localStorage
        accounts.push(newAccount);
        localStorage.setItem('accountsRegistered', JSON.stringify(accounts));
        
        // Show success message and redirect
        showAlert('success', 'Registration successful! Redirecting to login...', () => {
            window.location.href = 'index.html';
        });
        
        // Clear form
        registrationForm.reset();
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Name validation helper
    function validateName(name) {
        const re = /^[a-zA-Z\s]+$/;
        return re.test(name);
    }
    
    // Check if email is already registered
    function isEmailRegistered(email) {
        return accounts.some(account => account.registerEmail === email);
    }
    
    // Alert helper function
    function showAlert(icon, title, callback) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: icon === 'error',
            timer: icon === 'success' ? 1500 : 3000,
            position: 'center'
        }).then(() => {
            if (callback) callback();
        });
    }
});