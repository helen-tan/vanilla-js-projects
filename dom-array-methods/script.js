const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWeathBtn = document.getElementById('calculate-wealth');

// People data
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Add new user object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, 
                money: user.money * 2 
                };
    });

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear the main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;

        main.appendChild(element);
    });
}

// Format number as currency
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);

