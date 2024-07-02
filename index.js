// const myForm = document.getElementsByClassName("myForm");

const collapsible = document.getElementsByClassName("collapsible");

collapsible[0].addEventListener("click", () => {
    collapsible[0].classList.toggle("active");
    myForm = collapsible[0].nextElementSibling;
    if (myForm.style.display === "block") {
        myForm.style.display = "none";
    }
    else {
        myForm.style.display = "block";
    }
});

function createCard(name, date) {
    console.log("wah");
}