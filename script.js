
 // JavaScript to toggle accordion
const acc = document.querySelectorAll(".accordion");

acc.forEach(accItem => {
    accItem.addEventListener("click", () => {
        accItem.classList.toggle("active");
        const panel = accItem.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});
