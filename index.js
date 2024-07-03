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
        createNewCard(name[0].value, date[0].value);
    }
})

function createNewCard(name, date) {
    const newCard = document.createElement("div");
    const myH2 = document.createElement("h2");
    const myH4 = document.createElement("h4");
    const countdownDisplay = document.createElement("div");
    let dayDisplay = document.createElement("div");
    let hourDisplay = document.createElement("div");
    let minDisplay = document.createElement("div");
    let secDisplay = document.createElement("div");
    let deleteButton = document.createElement("button");

    newCard.classList.add("countdownCard");
    myH2.textContent = name;
    let month = date.slice(5, 7).trim();
    let day = date.slice(8).replace(/^0+/, "");
    switch (month) {
        case "01":
            month = "January";
            break;
        case "02":
            month = "February";
            break;
        case "03":
            month = "March";
            break;
        case "04":
            month = "April";
            break;
        case "05":
            month = "May";
            break;
        case "06":
            month = "June";
            break;
        case "07":
            month = "July";
            break;
        case "08":
            month = "August";
            break;
        case "09":
            month = "September";
            break;
        case "10":
            month = "October";
            break;
        case "11":
            month = "November";
            break;
        case "12":
            month = "December";
            break;
    }
    myH4.textContent = month + " " + day;

    countdownDisplay.classList.add("countdownDisplay");
    dayDisplay.classList.add("dayDisplay");
    hourDisplay.classList.add("hourDisplay");
    minDisplay.classList.add("minDisplay");
    secDisplay.classList.add("secDisplay");
    dayDisplay.innerHTML = `00<br>Days`;
    hourDisplay.innerHTML = `00<br>Hours`;
    minDisplay.innerHTML = `00<br>Minutes`;
    secDisplay.innerHTML = `00<br>Seconds`;

    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = deleteCard;

    newCard.appendChild(myH2);
    newCard.appendChild(myH4);
    newCard.appendChild(countdownDisplay);
    countdownDisplay.appendChild(dayDisplay);
    countdownDisplay.appendChild(hourDisplay);
    countdownDisplay.appendChild(minDisplay);
    countdownDisplay.appendChild(secDisplay);
    newCard.appendChild(deleteButton);

    cardsContainer.prepend(newCard);
}

//Figure out a way to delete the specified card every time
function deleteCard() {
    const theButton = document.getElementsByClassName("deleteButton");
    const theCard = theButton[0].parentNode;
    console.log(theButton);
    console.log(theCard);
}