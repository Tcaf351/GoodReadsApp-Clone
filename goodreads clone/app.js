// get app
const app = document.querySelector('#app');

// get spinner
const spinner = document.querySelector('.loader');

// show spinner
const showSpinner = () => { 
        spinner.classList.remove('hidden')
};

// hide spinner
const hideSpinner = () => { 
        spinner.classList.add('hidden');
};

// removes hidden class from the app to show app
const toggleApp = () => { 
    app.classList.remove('hidden');
};


const bookTitle = document.querySelector('.book-title'); // get book's title
const authorName = document.querySelector('.author-name'); // get authors name

// window.onload = () => {
    // search local storage for existing books and display then,
    // if no books exist, display with the messages 'add a book' in relevant sections
// };


// get search bar
const searchBar = document.querySelector('#search-bar');

// have initial value for outside event listener
let inputValue = '';

// add event listener to get the value
searchBar.addEventListener('input', (e) => {
    const inputValue = e.target.value;

    // switch spaces for dashes
    inputValue.split(" ").join("-")
});
console.log(inputValue);

// api
const apiUrl = `https://openlibrary.org/search.json?q=${inputValue}`;


let fetchApi = async (url) => { // fetch api onLoad of app opening
    try {
        showSpinner(); // Show spinner when starting to fetch API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
            
            const { title, author_name, number_of_pages_median } = data.docs[0]; // set the book title and author name from api

            bookTitle.textContent = title; // change the element text to be the title
            authorName.textContent = author_name[0]; // change the element text to be the author name
            bookPageCount = number_of_pages_median;
        }
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        hideSpinner(); // Hide spinner after fetch is complete
        toggleApp(); // show app
    }
};

fetchApi(apiUrl);


// get update progress button to open modal
const updateProgressButton = document.getElementsByTagName('button')[3]; 

// togggle modal
const modal = document.querySelector('.modal'); // get modal
const overlay = document.querySelector('.overlay') // get modal overlay

const modalDoneButton = document.getElementsByTagName('button')[1]; // get done button to close modal
const modalCancelButton = document.getElementsByTagName('button')[0]; // get cancel button to close modal

// open model
const openModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove("hidden");
};

// close modal
const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add("hidden");
};

// takes the book percentage calculation for how far through the book the user is and updates front end text content
const updateBookPercentage = () => {
    percentage.textContent = userBookPercentage;
}


// open modal event listener
updateProgressButton.addEventListener('click', openModal);

// cancel button on modal closes model
modalCancelButton.addEventListener('click', closeModal);

// done button on modal closes and updates percentage
modalDoneButton.addEventListener('click', closeModal);
modalDoneButton.addEventListener('click', updateBookPercentage);

// close modal when user clicks outside of modal container
overlay.addEventListener('click', closeModal);

// Functionality for percntage update when clicking on the 'done' button on modal
// get input where user enters the page they're up to
const pageNumberInput = document.querySelector('#modal-user-page-number');
const percentage = document.querySelector('#percentage');
let bookPageCount = 0; // set an initial value for the book percentage to work off
let userBookPercentage = 0;

pageNumberInput.addEventListener('input', (e) => {
    // get value of input
    const inputValue = e.target.value;

    // convert to a number
    const numberValue = parseInt(inputValue);

    // calculate percentage of way through book 
    if (!isNaN(numberValue)) {
        userBookPercentage = Math.floor((numberValue / bookPageCount) * 100);
    }
});


// search book



// add book to want to read




// add book to read



// finished book button to add book to read




// if percentage of book == 100% add book to read



// scan barcode of book to bring up modal


// search book on your shelf input - will need to filter through read books