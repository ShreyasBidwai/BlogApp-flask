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

// Upload button functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('img');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                uploadBtn.textContent = 'Image Selected';
                uploadBtn.style.background = '#341539';
            } else {
                uploadBtn.textContent = 'Upload Image';
                uploadBtn.style.background = '';
            }
        });
    }
});



    function validateFileType() {
        const fileInput = document.getElementById('img');
        const file = fileInput.files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Please choose a JPEG, PNG, or PDF file.');
                fileInput.value = ''; // Clear the input
                return false;
            }
        }
        return true;
    }