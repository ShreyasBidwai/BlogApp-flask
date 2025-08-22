const myForm = document.getElementById('myFormId');

myForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const labels = document.getElementsByClassName('label');

    // Reset all labels first
    for (let i = 0; i < labels.length; i++) {
        if (i == 0) {
            labels[i].innerText = "Name:";
            labels[i].style.color = "#fff";
            labels[i].style.fontSize = "14px";
            labels[i].style.marginBottom = "10px";
        }
        if (i == 1) {
            labels[i].innerText = "Email:";
            labels[i].style.color = "#fff";
            labels[i].style.fontSize = "14px";
            labels[i].style.marginBottom = "10px";
        }
        if (i == 2) {
            labels[i].innerText = "Password:";
            labels[i].style.color = "#fff";
            labels[i].style.fontSize = "14px";
            labels[i].style.marginBottom = "1rem";
        }
    }

    let hasError = false;
    // Name validation
    if (isEmpty(name)) {
        labels[0].innerText = "* Please enter your name.";
        labels[0].style.color = "#f87575";
        labels[0].style.fontSize = "15px";
        labels[0].classList.add('shake');
        hasError = true;
    }
    // Email validation
    if (isEmpty(email) || !isValidEmail(email)) {
        labels[1].innerText = "* Please enter a valid email address.";
        labels[1].style.color = "#f87575";
        labels[1].style.fontSize = "15px";
        labels[1].classList.add('shake');
        hasError = true;
    }
    // Password validation
    if (isEmpty(password) || !passwordRegex.test(password)) {
        labels[2].innerHTML = `
  * Please enter a valid password.
  <img 
    id="info-icon"
    src='/static/img/info.png' 
    alt='Info icon' 
    style='width: 15px; height: 15px; margin-left: 5px; cursor: pointer;' 
  />
`;
        labels[2].style.color = "#f87575";
        labels[2].style.fontSize = "15px";
        labels[2].classList.add('shake');
        // Add event listener after DOM update
        const infoIcon = document.getElementById('info-icon');
        if (infoIcon) {
            infoIcon.addEventListener('click', function() {
                alert("Password must be at least 8 characters long, include uppercase, lowercase letters, and a number.");
            });
        }
        hasError = true;
    }

    // Remove shake class after animation
    setTimeout(() => {
        for (let i = 0; i < labels.length; i++) {
            labels[i].classList.remove('shake');
        }
    }, 500);

    if (!hasError) {
        // All validations passed
        myForm.submit();
    }
});

// Helper function
function isEmpty(str) {
    return (!str || str.length === 0);
}

window.showPasswordInfo = function () {
    alert("Password must be at least 8 characters long, include uppercase, lowercase letters, and a number.");
};
