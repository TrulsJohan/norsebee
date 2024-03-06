import {toursData} from "../data/Data.mjs";

const toursContainer = document.getElementById("toursContainer");
const resetButton = document.getElementById("resetBtn");
const filterDropdown = document.getElementById("filterDropdown");

let locationArray = [];
let dataResult = [];

async function getData (){
    try {
        const {toursData} = await import("../data/Data.mjs");
        dataResult = toursData;
        renderData(dataResult);
    }
    catch (error){
        alert("Could not fetch data!");
    }
}

getData();

function renderData (data){
    for (let i = 0; i < data.length; i++){
        toursContainer.innerHTML += `
        <div>
            <h2>${data[i].name}</h2>
            <p>${data[i].location}</p>
            <p>${data[i].aproach}</p>
            <p>${data[i].description}</p>
            <a href="tours-info.html?id=${data[i].id}">
                <button>More info</button>
            </a>            
        </div>
        `
        if (!locationArray.includes(data[i].location)) {
            locationArray.push(data[i].location);
        }
    }
    for (let i = 0; i < locationArray.length; i++) {
        filterDropdown.innerHTML += `<option>${locationArray[i]}</option>`
    }
}

function renderFilterData(filterData) {
    toursContainer.innerHTML = ``;
    for (let i = 0; i < dataResult.length; i++) {
        if (dataResult[i].location === filterData) {
            toursContainer.innerHTML += `
                <div>
                    <h2>${dataResult[i].name}</h2>
                    <p>${dataResult[i].location}</p>
                    <p>${dataResult[i].aproach}</p>
                    <p>${dataResult[i].description}</p>
                    <a href="info.html?id=${dataResult[i].id}">
                        <button>More info</button>
                    </a>
                </div>
                `
        }
    }
}

filterDropdown.addEventListener("change", ()=> {
    if (filterDropdown.value === "All locations"){
        renderData(dataResult);
    } else {
        renderFilterData(filterDropdown.value)
    }});

resetButton.addEventListener("click", ()=> {
    toursContainer.innerHTML = ``;
    filterDropdown.innerHTML = `<option value="default" disabled selected>All locations</option>`;
    renderData(dataResult);
});

