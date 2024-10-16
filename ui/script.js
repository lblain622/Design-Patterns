// Simulate a basic Restaurant and Table system

const restaurant = new Restaurant("Bistro");


// Handle Reservation Form Submission
const reservationForm = document.getElementById("reservationForm");
const reservationList = document.getElementById("reservationList");

reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const partySize = document.getElementById("partySize").value;
    const special = document.getElementById("special").value;
    
    restaurant.makeReservation(name, date, time, special, partySize);

    displayReservations();

    // Clear form fields
    reservationForm.reset();
});

// Display Reservations
function displayReservations() {
    reservationList.innerHTML = '';

    restaurant.reservations.forEach((reservation) => {
        const div = document.createElement('div');
        div.className = 'reservation-item';
       
        div.innerHTML = `
            <p><span>Name:</span> ${reservation.name}</p>
            <p><span>Date:</span> ${reservation.date}</p>
            <p><span>Time:</span> ${reservation.time}</p>
            <p><span>Party Size:</span> ${reservation.partySize}</p>
            <p><span>Status:</span> ${reservation.getStatus()}</p>
        `;
        reservationList.appendChild(div);
    });
}


// Handle Process Reservations Button
const processReservationsButton = document.getElementById("processReservations");
processReservationsButton.addEventListener("click", function () {
    restaurant.processTables();
    displayReservations();
    displayHistory();
});

function displayHistory() {
    const historyList = document.getElementById("reservationHistory");
    historyList.innerHTML = '';

    restaurant.completedReservations.forEach((reservation) => {
        const div = document.createElement('div');
        div.className = 'reservation-item';
        div.innerHTML = `
            <p><span>Name:</span> ${reservation.name}</p>
            <p><span>Date:</span> ${reservation.date}</p>
            <p><span>Time:</span> ${reservation.time}</p>
            <p><span>Party Size:</span> ${reservation.partySize}</p>
            <p><span>Status:</span> ${reservation.getStatus()}</p>
        `;
        historyList.appendChild(div);
    });
}