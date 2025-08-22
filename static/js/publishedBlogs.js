// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.getElementById('navbar-toggle');
    if (navbar && toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            navbar.classList.toggle('navbar-collapsed');
            const bodyContainer = document.getElementById('body-container');
            if (navbar.classList.contains('navbar-collapsed')) {
                bodyContainer.style.gridTemplateColumns = '60px 1fr';
            } else {
                bodyContainer.style.gridTemplateColumns = '220px 1fr';
            }
        });
    }
});
