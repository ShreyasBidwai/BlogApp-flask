    const myForm = document.getElementById('myFormId');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        
        const labels = document.getElementsByClassName('label');

        //Need to understand this part
        for (let i = 0; i < labels.length; i++) {
            if (i == 0) {
                labels[i].innerText = "Email:";
                labels[i].style.color = "#fff";
                labels[i].style.fontSize = "14px";
                labels[i].style.marginBottom = "10px";
            }
            if (i == 1) {
                labels[i].innerText = "Password:";
                labels[i].style.color = "#fff";
                labels[i].style.fontSize = "14px";
                labels[i].style.marginBottom = "10px";
            }

        }

        let hasError = false;

        // Email validation
        if (isEmpty(email)) {
            labels[0].innerText = "* Please enter a valid email address.";
            labels[0].style.color = "#f87575";
            labels[0].style.fontSize = "15px";
            labels[0].classList.add('shake');
            hasError = true;
        }

        if (isEmpty(password)) {
            labels[1].innerText = "* Please enter your password.";
            labels[1].style.color = "#f87575";
            labels[1].style.fontSize = "15px";
            labels[1].classList.add('shake');
            hasError = true;
        }



        
        setTimeout(() => {
            for (let i = 0; i < labels.length; i++) {
                labels[i].classList.remove('shake');
            }
        }, 500);

        if (!hasError) {
            
            myForm.submit();
        }
    });

    // Helper function
    function isEmpty(str) {
        return (!str || str.length === 0);
    }

//Login Success Handling

