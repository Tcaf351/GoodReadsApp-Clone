// import functions
import { showSpinner, hideSpinner, app, toggleApp } from "./spinner";

import { openModal, closeModal, overlay, modalDoneButton, modalCancelButton } from "./updateProgressModal";

// import { updateBookPercentage, bookPageCount, pageNumberInput, percentage } from "./bookPercentage";

const bookTitle = document.querySelector('.book-title'); // get book's title
const authorName = document.querySelector('.author-name'); // get authors name

// Buttons
const searchButton = document.querySelector('#search-button'); // button next to input bar 
const updateProgressButton = document.querySelector('#update-progress-button'); // get update progress button to open modal

const wantToReadOrReadButton = document.querySelector('#want-to-read-or-read');

// window.onload = () => {
    // search local storage for existing books and display then,
    // if no books exist, display with the messages 'add a book' in relevant sections
// };

//search book - INPUT SEARCH/BUTTON - START
// get search bar
const inputSearchBar = document.querySelector('#search-bar');

// set a global value
let inputValue = '';

const getValueOfInput = (e) => {
    inputValue = e.target.value.replace(/ /g, '-'); // Replace spaces with dashes
};

const getValueOfSearchButton = () => {
    inputValue;
};

// add event listener to get the value
inputSearchBar.addEventListener('input', getValueOfInput);

// Get value on input
searchButton.addEventListener('click', getValueOfSearchButton);
// INPUT SEARCH/BUTTON - FINISH


// onclick of search button needs to call a function to fetch api

// api
// const isbnValue = '/0385472579';
const isbnValue = '';
// const bookCoverApi = `https://covers.openlibrary.org/b/isbn${isbnValue}-M.jpg`;
// const newApi = [title, author_name, number_of_pages_median, ...bookCoverApi];

const apiUrl = `https://openlibrary.org/search.json?q=`;

const fetchApi = async (api, inputValue) => {
    try {
        showSpinner(); // Show spinner when starting to fetch API
        const response = await fetch(api+inputValue);

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

searchButton.addEventListener('click', () => fetchApi(apiUrl, inputValue));

// takes the book percentage calculation for how far through the book the user is and updates front end text content
const updateBookPercentage = () => {
    percentage.textContent = userBookPercentage;
}

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

// EVENT LISTENERS

// open modal event listener
updateProgressButton.addEventListener('click', openModal);

// done button on modal closes and updates percentage
modalDoneButton.addEventListener('click', closeModal);
modalDoneButton.addEventListener('click', updateBookPercentage);

// cancel button on modal closes model
modalCancelButton.addEventListener('click', closeModal);

// close modal when user clicks outside of modal container
overlay.addEventListener('click', closeModal);

// Functionality for percntage update when clicking on the 'done' button on modal




// add book to want to read




// add book to read



// finished book button to add book to read




// if percentage of book == 100% add book to read



// scan barcode of book to bring up modal


// search book on your shelf input - will need to filter through read books