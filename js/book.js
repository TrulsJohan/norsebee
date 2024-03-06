const bookingContainer = document.getElementById("bookingContainer");
const checkoutBtn = document.getElementById("checkoutBtn");
const calendar = document.querySelector(`.calendar`);
let moviesDeserialized = JSON.parse(localStorage.getItem("data"));
console.log(moviesDeserialized);

checkoutBtn.style.display = `none`;
calendar.style.display = `none`;

function renderBookings (){
    for (let i = 0; i < moviesDeserialized.length; i++){
        bookingContainer.innerHTML += `
        <div>
            <h2>${moviesDeserialized[i].name}</h2>
            <p>${moviesDeserialized[i].location}</p>
            <p>${moviesDeserialized[i].aproach}</p>
            <p>${moviesDeserialized[i].description}</p>
            <button class="removeBtn" data-index="${i}">Remove from booking</button>            
        </div>
        `
    }
    generateCalendar();
}

renderBookings(moviesDeserialized);

bookingContainer.addEventListener("click", (event)=> {
    if (event.target.classList.contains("removeBtn")) {
        const indexToRemove = event.target.dataset.index;
        moviesDeserialized.splice(indexToRemove, 1);
        localStorage.setItem("data", JSON.stringify(moviesDeserialized));
        bookingContainer.innerHTML = "";
        renderBookings();
        checkoutContainer();
    }
})

function checkoutContainer (){
    if (moviesDeserialized.length === 0){
        checkoutBtn.style.display = `none`;
        calendar.style.display = `none`;
    } else {
        checkoutBtn.style.display = `block`;
        calendar.style.display = `block`;
    }
}

checkoutContainer();

// calendar
const daysContainer = document.querySelector('.days');
const header = document.querySelector('.header');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = [];
let dataResult = [];

async function generateCalendar() {
    try {
        //fetching savedDates from server
        const {calendarData} = await import("../data/cData.mjs");
        dataResult = calendarData;

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentMonthData = dataResult[currentMonth];

        header.textContent = months[currentMonth] + ' ' + currentYear;

        daysContainer.innerHTML = '';

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;

            //Comparing dates to server savedDates
            if (currentMonthData && currentMonthData.includes(i)) {
                dayElement.classList.add('booked');
                dayElement.setAttribute('disabled', 'disabled');
            } else {
                dayElement.addEventListener('click', () => {
                    const selectedDate = {
                        day: i,
                        month: currentMonth,
                        year: currentYear
                    };
                    const index = selectedDates.findIndex(date => date.day === i && date.month === currentMonth && date.year === currentYear);

                    if (index !== -1) {
                        dayElement.classList.remove('active');
                        selectedDates.splice(index, 1);
                    } else {
                        dayElement.classList.add('active');
                        selectedDates.push(selectedDate);
                    }
                    console.log(selectedDates);
                });
            }
            daysContainer.appendChild(dayElement);
        }
    }
    catch (error){
        alert("Could not fetch data!");
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

checkoutBtn.addEventListener("click", ()=> {
    localStorage.clear();
});

// Dates to add to form.
console.log(selectedDates);

