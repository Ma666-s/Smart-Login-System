document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const usernameDisplay = document.getElementById('username');
  const usernameNavDisplay = document.getElementById('usernameNav');
  const logoutBtn = document.getElementById('logoutBtn');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Check if user is logged in
  function checkAuth() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if (!currentUser) {
          // Redirect to login if not authenticated
          showAlert('error', 'You need to login first', () => {
              window.location.href = 'index.html';
          });
          return null;
      }
      return currentUser;
  }
  
  // Display user info
  function displayUserInfo() {
      const user = checkAuth();
      if (user) {
          usernameDisplay.textContent = user.registerName || user.name;
          usernameNavDisplay.textContent = user.registerName || user.name;
          
          // Show welcome message only on first load
          if (!sessionStorage.getItem('welcomeShown')) {
              showAlert('success', `Welcome back, ${user.registerName || user.name}!`);
              sessionStorage.setItem('welcomeShown', 'true');
          }
      }
  }
  
  // Logout function
  function handleLogout() {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of the system',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
      }).then((result) => {
          if (result.isConfirmed) {
              // Clear session and redirect
              localStorage.removeItem('currentUser');
              sessionStorage.removeItem('welcomeShown');
              
              showAlert('success', 'Logged out successfully', () => {
                  window.location.href = 'index.html';
              });
          }
      });
  }
  
  // Set current year in footer
  function setCurrentYear() {
      currentYearSpan.textContent = new Date().getFullYear();
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
  
  // Event Listeners
  logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogout();
  });
  
  // Initialize
  displayUserInfo();
  setCurrentYear();
  
  // Check for theme preference
  if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
});