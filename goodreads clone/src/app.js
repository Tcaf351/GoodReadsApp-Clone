// import functions
import { showSpinner, hideSpinner } from "./spinner";
import { openModal, closeModal, overlay, modalDoneButton, modalCancelButton } from "./updateProgressModal";
import { dropdownHander } from "./dropdownHandler";
import { windowOnLoadLocalStorage, windowOnLoadLocalStorageWantToRead, windowOnLoadLocalStorageRead, windowOnLoadLocalStorageCurrentlyReading } from "./localStorageHandler";
import { calculatePercentageOfBookCompletion } from "./calculateBookPercentage";

// import { updateBookPercentage, bookPageCount, pageNumberInput, percentage } from "./bookPercentage";
// get app
export const app = document.querySelector('#app');

// Variables
const bookTitle = document.querySelector('.book-title'); // get book's title
const bookSubTitle = document.querySelector('.book-subtitle'); // get book's subtitle
const authorName = document.querySelector('.author-name'); // get authors name
const bookPublisher = document.querySelector('#publisher');
const bookCover = document.querySelector('.book-cover'); // get book cover
const bookDescription = document.querySelector('#book-description'); // get book description
let bookPageCount; // gets page count of a book

// Containers


// Buttons
const form = document.querySelector('#search-form');
const updateProgressButton = document.querySelector('#update-progress-button'); // get update progress button to open modal
const dropdown = document.querySelector('#reading-dropdown'); // dropdown options when user is on individual book

// Modals
const individualBookModal = document.querySelector('#individual-book-modal');
const modalBookCovers = document.querySelector('#modal-book-covers');

// Categories
const categories = ['want to read', 'currently reading', 'read'];

// EXTEND THE FOCUS OUTLINE ON THE SEARCH BAR FORM


// onLoad of application look in localStorage to see if any books are present that are under 1 day old.
window.onload = windowOnLoadLocalStorage(categories);
window.onload = windowOnLoadLocalStorageWantToRead(categories);
window.onload = windowOnLoadLocalStorageRead(categories);
window.onload = windowOnLoadLocalStorageCurrentlyReading(categories);





//search book - INPUT SEARCH/BUTTON
// get search bar
const inputSearchBar = document.querySelector('#search-bar');

// api
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=`;
const API_KEY = 'AIzaSyCOiprMZ6jnfmZ2HQuzI-n6XrwTJjeeyhs'


const fetchApi = async (api) => {
    try {
        showSpinner(); // Show spinner when starting to fetch API
        const response = await fetch(`${api}`);

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
            console.log(bookPageCount);
            bookTitle.textContent = title;
            bookSubTitle.textContent = subtitle;
            authorName.textContent = `by ${authors}`;
            bookCover.src = bookImage;
            bookDescription.textContent = description;
            bookPublisher.textContent = `book published by: ${publisher}`;

            modalBookCovers.children[0].src = bookImage;
            modalBookCovers.children[1].src = bookImage;

            // set a limit for bookDescription if over 50 characters
            if (description.length > 200) {
                const shortenedDescription = description.slice(0, 200) + '...';
                let isShortened = true;

                const updateDescription = () => {
                    bookDescription.textContent = isShortened ? shortenedDescription : description;

                    // Append the toggle link to the description
                    bookDescription.appendChild(toggleLink);
                };

                // Create the Read More/Read Less link
                const toggleLink = document.createElement('a');
                toggleLink.textContent = 'Read More';
                toggleLink.href = '#';
                toggleLink.className = 'text-gray-900 hover:text-gray-300 ml-2';

                // Add toggle functionality
                toggleLink.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent navigation
                    isShortened = !isShortened; // Toggle the state
                    toggleLink.textContent = isShortened ? 'Read More' : 'Read Less'; // Update link text
                    updateDescription(); // Update the description
                });

                // Set initial description and append the link
                updateDescription();
            } else {
                bookDescription.textContent = description;
            }
        }
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        hideSpinner(); // Hide spinner after fetch is complete
        // toggleApp(); // show app
        toggleIndividualBookModal()
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    inputSearchBar.value;
    await fetchApi(apiUrl+inputSearchBar.value)

    // waits for the api to finish being called before handling the dropdown data
    dropdownHander(dropdown, 
        bookTitle,
        bookSubTitle,
        authorName,
        bookCover,
        bookDescription,
        bookPublisher,
        bookPageCount
    )
});




// removes hidden class from the app to show app
const toggleApp = () => { 
    app.classList.remove('hidden');
};

const toggleIndividualBookModal = () => {
    individualBookModal.classList.remove('hidden')
};



// EVENT LISTENERS

// open modal event listener
updateProgressButton.addEventListener('click', openModal);

// done button on modal closes and updates percentage
modalDoneButton.addEventListener('click', closeModal);
// modalDoneButton.addEventListener('click', updateBookPercentage);

// cancel button on modal closes model
modalCancelButton.addEventListener('click', closeModal);

// close modal when user clicks outside of modal container
overlay.addEventListener('click', closeModal);

// Functionality for percntage update when clicking on the 'done' button on modal




// calculates percentage of way through the book, if === to 100 then it will add the book to the read category.
calculatePercentageOfBookCompletion()

// finished book button to add book to read



// update code so that if there's no books in localstorage the maps in the localstoragehandler file still work.




// if percentage of book == 100% add book to read