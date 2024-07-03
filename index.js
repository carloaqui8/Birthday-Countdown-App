const cardsContainer = document.getElementById("cardsContainer");
const collapsibles = document.getElementsByClassName("collapsible");
let myForm = document.getElementsByClassName("myForm");

collapsibles[0].addEventListener("click", () => {
    collapsibles[0].classList.toggle("active");

    myForm = collapsibles[0].nextElementSibling;

    if (myForm.style.maxHeight) {
        myForm.style.maxHeight = null;
        collapsibles[0].style.borderRadius = "12px";
        myForm.style.padding = "0 8px";
    }
    else {
        myForm.style.display = "block";
        myForm.style.maxHeight = myForm.scrollHeight + "px";
        collapsibles[0].style.borderRadius = "12px 12px 0 0";
        myForm.style.padding = "8px";
    }
});

myForm[0].addEventListener("submit", (event) => {
    event.preventDefault();
    
    let name = document.getElementsByClassName("nameInput");
    let date = document.getElementsByClassName("dateInput");
    if (name[0].value === "" || date[0].value === "") {
        console.error("BOOOOOO");
    }
    else {
        console.log(name[0].value);
        console.log(date[0].value);
    }

    createNewCard(name[0].value, date[0].value);
})

function createNewCard(name, date) {
    let newCard = document.createElement("h1");
    newCard.textContent = "HUH";

    cardsContainer.appendChild(newCard);
}