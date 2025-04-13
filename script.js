let timerInterval = null;
let isParkingActive = false;
let pricePerMinute = 0.1;
let secondsElapsed = 0;
let selectedSpot = null;
let freespotsno = 0;

window.onload = function() {
    const plate = localStorage.getItem('licensePlate');
    if (plate) {
        document.getElementById('CN').textContent = plate;
    }
    document.getElementById("time-display").innerText = `0.00€`;
    
    const storedData = localStorage.getItem('selectedSpot');
    if (storedData) {
        const spotData = JSON.parse(storedData);
        selectedSpot = spotData.name;
        pricePerMinute = spotData.price;
        freespotsno = spotData.slots;
        
        document.getElementById('location').textContent = selectedSpot;
        document.getElementById('price-const').textContent = 
            `Price to park here: ${pricePerMinute.toFixed(2)}€/min`;
        document.getElementById('parking-spot').textContent=
            `Free spots : ${freespotsno}`;
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
        if (!localStorage.getItem('licensePlate')) {
            alert("Please enter your license plate first!");
            window.location.href = '1.html';
            return;
        }
        
        isParkingActive = true;
        button.innerText = "STOP";
        secondsElapsed = 0;
        timer();
    } else {
        clearInterval(timerInterval);
        const totalPrice = (secondsElapsed / 60 * pricePerMinute).toFixed(2);
        priceDisplay.innerText = `Total : ${totalPrice}€`;
        button.innerText = "PAY";
        isParkingActive = false;
        saveParkingSession(selectedSpot, secondsElapsed, totalPrice);

        button.onclick = function() {
            saveParkingSession(selectedSpot, secondsElapsed, totalPrice);
            button.innerText="START";
            const totalPrice1 = (secondsElapsed / 60 * pricePerMinute).toFixed(2);
            localStorage.setItem('parkingTotal', totalPrice1);
            window.location.href = 'Payment.html';
        };
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
        date: new Date().toISOString(),
        licensePlate: localStorage.getItem('licensePlate')
    };
    console.log("Parking session:", session);
}

function ParkingSpots() {
    window.location.href = 'list.html';
}
