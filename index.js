let timerInterval = null;
let isParkingActive = false;
let pricePerMinute = 0.1;
let secondsElapsed = 0;
let selectedSpot = null;

window.onload = function() {
    document.getElementById("time-display").innerText = `0.00€`;
    const storedData = localStorage.getItem('selectedSpot');
    if (storedData) {
        const spotData = JSON.parse(storedData);
        selectedSpot = spotData.name;
        pricePerMinute = spotData.price;
        
        document.getElementById('location').textContent = selectedSpot;
        document.getElementById('price-const').textContent = 
            `Price to park here: ${pricePerMinute.toFixed(2)}€/min`;
    }
};

function toggleParkingTime() {
    const button = document.getElementById("toggle-button");
    const priceDisplay = document.getElementById("time-display");
    const parkTimeDisplay = document.getElementById("park-time-display");

    if (!isParkingActive) {
        if (!selectedSpot) {
            alert("Please select a parking spot first!");
            return;
        }
        
        isParkingActive = true;
        button.innerText = "STOP";
        secondsElapsed = 0;
        timer();
    } else {
        clearInterval(timerInterval);
        const totalPrice = (secondsElapsed / 60 * pricePerMinute).toFixed(2);
        priceDisplay.innerText = `Total: ${totalPrice}€`;
        button.innerText = "START";
        isParkingActive = false;
        
        saveParkingSession(selectedSpot, secondsElapsed, totalPrice);
    }
}

function timer() {
    const priceDisplay = document.getElementById('time-display');
    const parkTimeDisplay = document.getElementById('park-time-display');

    timerInterval = setInterval(function() {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        
        parkTimeDisplay.innerText = `${padTime(minutes)}:${padTime(seconds)}`;
        priceDisplay.innerText = `${(secondsElapsed / 60 * pricePerMinute).toFixed(2)}€`;
    }, 1000);
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

function saveParkingSession(spot, duration, price) {
    const session = {
        spot: spot,
        duration: duration,
        price: price,
        date: new Date().toISOString()
    };
    console.log("Parking session:", session);
}

function ParkingSpots() {
    window.location.href = 'list.html';
}