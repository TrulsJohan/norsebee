const infoContainer = document.getElementById("infoContainer");
const bookBtn = document.getElementById("bookBtn")

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idValue = urlParam.get(`id`);

let tourId = [];
async function getData (){
    try {
        const {toursData} = await import("../data/Data.mjs");
        tourId = toursData.find(val => val.id === parseInt(idValue));
        renderData(tourId);
        console.log(tourId)
    }
    catch (error){
        alert("Could not fetch data!");
    }
}

getData();

function renderData (){
    infoContainer.innerHTML += `
        <div>
            <h2>${tourId.name}</h2>
            <p>${tourId.location}</p>
            <p>${tourId.aproach}</p>
            <p>${tourId.description}</p>   
            <p>${tourId.locationDescription}</p>                  
        </div>
        `
}

bookBtn.addEventListener("click", ()=> {
    saveLocalStorage();
});

function saveLocalStorage (){
    let newData = tourId;
    if (localStorage.getItem(`data`) === null){
        localStorage.setItem(`data`, `[]`);
    }
    let oldData = JSON.parse(localStorage.getItem(`data`));
    const exists = oldData.some(item => item.id === newData.id);
    if (!exists){
        oldData.push(newData);
        localStorage.setItem(`data`, JSON.stringify(oldData));
    }
}

