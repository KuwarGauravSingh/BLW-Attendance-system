document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'Gaurav@123') {
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Invalid login credentials');
    }
});
