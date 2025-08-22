function authPage() {
    const home = document.getElementById("homePage");
    const auth = document.getElementById("authPage");
    auth.classList.add("active");
    setTimeout(() => {
        home.classList.remove("active");
    }, 500);
}

function homePage() {
    const home = document.getElementById("homePage");
    const auth = document.getElementById("authPage");
    home.classList.add("active");
    setTimeout(() => {
        auth.classList.remove("active");
    }, 500);
}