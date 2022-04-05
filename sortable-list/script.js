const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [  // In correct order
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slin Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))   // turns arr into an arr of objects
    .sort((a, b) => a.sort - b.sort)    // Sorts/orders the arr by the random 'sort' valueb (Scrambles list items)
    .map(a => a.value) // Turn arr into just their 'value' - the name (aldy in their scrambled positions)
    .forEach((person, index) => {
            // console.log(person);
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class=""draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });
}