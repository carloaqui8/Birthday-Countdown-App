const cardsContainer = document.getElementById("cardsContainer");
const collapsibles = document.getElementsByClassName("collapsible");
let myForm = document.getElementsByClassName("myForm");
let errorMsg = document.getElementById("errorMsg");
let deleteButtons = document.getElementsByClassName("deleteButton");

//Check local storage if any cards exist and create them
// localStorage.clear();
let existingCards = JSON.parse(localStorage.getItem('nameAndDateObjs')) || [];
existingCards.forEach((card) => {
    createNewCard(String(card.name), card.date);
});

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

    //Input validation
    if (name[0].value === "" || date[0].value === "") {
        errorMsg.textContent = "Error: Please enter a name and date";
        errorMsg.style.display = "block";
    }
    else {
        //Store name and date to localStorage
        const jsonObj = { "name": String(name[0].value), "date": String(date[0].value) };
        existingCards.push(jsonObj);
        localStorage.setItem('nameAndDateObjs', JSON.stringify(existingCards));
        
        //Create new card on page
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
    let month = date.slice(5, 7).trim();
    let monthNum = date.slice(5, 7).trim();
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

    //Start the countdown
    setRemainingTime(Number(monthNum) - 1, Number(day), countdownDisplay);
    setInterval(() => setRemainingTime(Number(monthNum) - 1, Number(day), countdownDisplay), 1000);

    //Add delete button functionality to each card
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function () {
            //Delete from local storage too
            existingCards.reverse().splice(i, 1);
            existingCards.reverse();
            localStorage.setItem('nameAndDateObjs', JSON.stringify(existingCards));
            console.log(existingCards);
            console.log(localStorage);
            
            let card = this.parentElement;
            card.style.display = "none";
        }
    }
}

function setRemainingTime(month, day, countdownDisplay) {
    //Date countdown stuff
    let today = new Date();
    let futureDate;
    if (today.getMonth() > month ||
        (today.getMonth() == (month) && today.getDate() >= day)) {
        futureDate = new Date(today.getFullYear() + 1, month, day);
    }
    else {
        futureDate = new Date(today.getFullYear(), month, day);
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

    //Change values to countdownDisplay
    countdownDisplay.children[0].innerHTML = `${daysRem}<br>Days`;
    countdownDisplay.children[1].innerHTML = `${hoursRem}<br>Hours`;
    countdownDisplay.children[2].innerHTML = `${minRem}<br>Minutes`;
    countdownDisplay.children[3].innerHTML = `${secRem}<br>Seconds`;
}
