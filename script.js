const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu a");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
        document.body.style.overflow = "hidden";
    } else {
        menuToggle.innerHTML = "☰";
        document.body.style.overflow = "";
    }
});

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuToggle.innerHTML = "☰";
        document.body.style.overflow = "";
    });
});
