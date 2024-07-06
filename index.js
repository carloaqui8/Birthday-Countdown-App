const cardsContainer = document.getElementById("cardsContainer");
const collapsibles = document.getElementsByClassName("collapsible");
let myForm = document.getElementsByClassName("myForm");
let errorMsg = document.getElementById("errorMsg");
let deleteButtons = document.getElementsByClassName("deleteButton");

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
        errorMsg.textContent = "Error: Please enter a name and date";
        errorMsg.style.display = "block";
    }
    else {
        errorMsg.style.display = "none";
        createNewCard(name[0].value, date[0].value);
    }
})

function createNewCard(name, date) {
    //Create a new card with each attribute needed
    const newCard = document.createElement("div");
    const myH2 = document.createElement("h2");
    const myH4 = document.createElement("h4");
    const countdownDisplay = document.createElement("div");
    let dayDisplay = document.createElement("div");
    let hourDisplay = document.createElement("div");
    let minDisplay = document.createElement("div");
    let secDisplay = document.createElement("div");
    let deleteButton = document.createElement("button");

    //Add headings that show name and date
    newCard.classList.add("countdownCard");
    myH2.textContent = name;
    let monthNum = date.slice(5, 7).trim();
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

    //Add countdown display
    countdownDisplay.classList.add("countdownDisplay");
    dayDisplay.classList.add("dayDisplay");
    hourDisplay.classList.add("hourDisplay");
    minDisplay.classList.add("minDisplay");
    secDisplay.classList.add("secDisplay");
    dayDisplay.innerHTML = `00<br>Days`;
    hourDisplay.innerHTML = `00<br>Hours`;
    minDisplay.innerHTML = `00<br>Minutes`;
    secDisplay.innerHTML = `00<br>Seconds`;

    // getRemainingTime();

    //Add delete button
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");

    //Add the various parts to the card div
    newCard.appendChild(myH2);
    newCard.appendChild(myH4);
    newCard.appendChild(countdownDisplay);
    countdownDisplay.appendChild(dayDisplay);
    countdownDisplay.appendChild(hourDisplay);
    countdownDisplay.appendChild(minDisplay);
    countdownDisplay.appendChild(secDisplay);
    newCard.appendChild(deleteButton);

    //Push it to the display
    cardsContainer.prepend(newCard);

    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function() {
            let card = this.parentElement;
            card.style.display = "none";
        }
    }
    console.log(deleteButtons);
}

function getRemainingTime(monthNum, day, dayDisplay, hourDisplay, minDisplay, secDisplay) {
    //Date countdown stuff
    let today = new Date();
    let futureDate;
    if ((today.getMonth() == (Number(monthNum) - 1) &&
        today.getDay() >= day) || today.getMonth() > (Number(monthNum) - 1)) {
        futureDate = new Date(today.getFullYear() + 1, monthNum - 1, day);
    }
    else {
        futureDate = new Date(today.getFullYear(), monthNum - 1, day);
    }
    const timeRemaining = futureDate.getTime() - today.getTime();

    //Define time metrics in ms
    const aDay = 24 * 60 * 60 * 1000;
    const anHour = 60 * 60 * 1000;
    const aMinute = 60 * 1000;

    //Calculate time remaining for each
    let daysRem = Math.floor(timeRemaining / aDay);
    let hoursRem = Math.floor((timeRemaining % aDay) / anHour);
    let minRem = Math.floor((timeRemaining % anHour) / aMinute);
    let secRem = Math.floor((timeRemaining % aMinute) / 1000);
    console.log(daysRem);
    console.log(hoursRem);
    console.log(minRem);
    console.log(secRem);

    //Change values to countdownDisplay
    dayDisplay.innerHTML = `${daysRem}<br>Days`;
    hourDisplay.innerHTML = `${hoursRem}<br>Hours`;
    minDisplay.innerHTML = `${minRem}<br>Minutes`;
    secDisplay.innerHTML = `${secRem}<br>Seconds`;
}

// let countdown = setInterval(getRemainingTime, 1000);