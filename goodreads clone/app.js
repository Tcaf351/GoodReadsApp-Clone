// import functions
import { showSpinner, hideSpinner } from "./spinner";
import { openModal, closeModal, overlay, modalDoneButton, modalCancelButton } from "./updateProgressModal";

// import { updateBookPercentage, bookPageCount, pageNumberInput, percentage } from "./bookPercentage";
// get app
export const app = document.querySelector('#app');

// Variables
const bookTitle = document.querySelector('.book-title'); // get book's title
const bookSubTitle = document.querySelector('.book-subtitle'); // get book's subtitle
const authorName = document.querySelector('.author-name'); // get authors name
const ratingAverage = document.querySelector('.rating-average'); // get average rating
const bookPublisher = document.querySelector('#publisher');
const bookCover = document.querySelector('.book-cover'); // get book cover
const bookDescription = document.querySelector('#book-description'); // get book description

// Buttons
const searchButton = document.querySelector('#search-button'); // button next to input bar 
const updateProgressButton = document.querySelector('#update-progress-button'); // get update progress button to open modal

// Modals
const individualBookModal = document.querySelector('#individual-book-modal');
const modalBookCovers = document.querySelector('#modal-book-covers');

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
    return inputValue = e.target.value.replace(/ /g, '+'); // Replace spaces with dashes
};

const getValueOfSearchButton = () => {
    inputValue;
};

// add event listener to get the value
inputSearchBar.addEventListener('input', getValueOfInput);

// Get value on input
searchButton.addEventListener('click', getValueOfSearchButton);

// api
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=`;
const API_KEY = 'AIzaSyCOiprMZ6jnfmZ2HQuzI-n6XrwTJjeeyhs'


const fetchApi = async (api) => {
    try {
        showSpinner(); // Show spinner when starting to fetch API
        const response = await fetch(`${api}${inputValue}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const apiResponse = await response.json();
            const data = apiResponse?.items[0].volumeInfo
            console.log(data);

            const { title, subtitle, description, averageRating, pageCount, publisher } = data;
            const authors = data.authors[0];
            const bookImage = data?.imageLinks.thumbnail

            bookPageCount = pageCount;
            bookTitle.textContent = title;
            bookSubTitle.textContent = subtitle;
            authorName.textContent = `by ${authors}`;
            bookCover.src = bookImage;
            ratingAverage.textContent = averageRating;
            bookDescription.textContent = description;
            bookPublisher.textContent = `book published by: ${publisher}`;

            modalBookCovers.children[0].src = bookImage;
            modalBookCovers.children[1].src = bookImage;
        }
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        hideSpinner(); // Hide spinner after fetch is complete
        // toggleApp(); // show app
        toggleIndividualBookModal()
    }
};

// removes hidden class from the app to show app
const toggleApp = () => { 
    app.classList.remove('hidden');
};



const toggleIndividualBookModal = () => {
    individualBookModal.classList.remove('hidden')
};

searchButton.addEventListener('click', () => fetchApi(apiUrl));

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