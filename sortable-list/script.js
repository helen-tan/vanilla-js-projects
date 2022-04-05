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
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

        addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');

    dragStartIndex = +this.closest('li').getAttribute('data-index'); // Look at the closest li
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    
    // Add the grey background 
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');

    // Remove the grey background 
    this.classList.remove('over');  // 'this' pertains to the actual li
}

function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault(); // Prevent dragover event from interfering with dragdrop
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');

    // Swap items
    swapItems(dragStartIndex, dragEndIndex);

    // Remove grey background
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable'); // <div> enclosing name and icon
    const dragListItems = document.querySelectorAll('.draggable-list li'); // <li>s

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    });
}