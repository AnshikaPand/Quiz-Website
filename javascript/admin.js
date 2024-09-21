// admin login
const toggleAdminPassword = document.querySelector('#toggleAdminPassword');
const adminPassword = document.querySelector('#admin-password');

toggleAdminPassword.addEventListener('click', function () {
    const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    adminPassword.setAttribute('type', type);
    this.classList.toggle('bx-hide');
    this.classList.toggle('bx-show');
});

// Admin login function with voice welcome message
function adminLogin() {
    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;

    if (adminEmail === "admin@gmail.com" && adminPassword === "admin") {
        // Welcome message with user's name
        const username = "Anshika"; 

        // Create a new SpeechSynthesisUtterance instance
        const utterance = new SpeechSynthesisUtterance(`Welcome ${username}`);
        utterance.pitch = 1; 
        utterance.rate = 1; 

        // Speak the message
        window.speechSynthesis.speak(utterance);

        alert("Admin login successful!");
        window.location.href = "teacher.html";
    } else {
        alert("Incorrect admin email or password. Please try again.");
    }
}


// teacher.html


 // Toggle sidebar visibility when menu icon is clicked
 document.querySelector('.bx-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    let welcomeAdminElement = document.getElementById("welcome-admin");

    new Typed(welcomeAdminElement, {
        strings: ["Welcome Anshika"],
        typeSpeed: 10,
        backSpeed: 300,
        backDelay: 100,
        loop: true
    });
});

// -----logout-----//

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('admin-logout-btn');
    logoutButton.addEventListener('click', function() {
        const confirmation = confirm('Are you sure you want to log out?');
        if (confirmation) {
            // User clicked "OK"
            window.location.href = 'adminlogin.html'; 
        } else {
            // User clicked "Cancel"
            console.log('Logout cancelled');
        }
    });
});
