// import functions
import { showSpinner, hideSpinner } from "./spinner";
import { openModal, closeModal, overlay, modalDoneButton, modalCancelButton } from "./updateProgressModal";
import { dropdownHander } from "./dropdownHandler";
import { windowOnLoadLocalStorage, windowOnLoadLocalStorageWantToRead, windowOnLoadLocalStorageRead, windowOnLoadLocalStorageCurrentlyReading } from "./localStorageHandler";
import { calculatePercentageOfBookCompletion } from "./calculateBookPercentage";
import { getUrl } from './backArrow';

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

// Buttons
const form = document.querySelector('#search-form');
const updateProgressButton = document.querySelector('#update-progress-button'); // get update progress button to open modal
const dropdown = document.querySelector('#reading-dropdown'); // dropdown options when user is on individual book
getUrl()

// Modals
const individualBookModal = document.querySelector('#individual-book-modal');
const modalBookCovers = document.querySelector('#modal-book-covers');

// Categories
const categories = ['want to read', 'currently reading', 'read'];

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

const fetchApi = async (api) => {
    try {
        showSpinner(); // Show spinner when starting to fetch API
        const response = await fetch(`${api}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const apiResponse = await response.json();
            const data = apiResponse?.items[0]?.volumeInfo;
            console.log(data);

            const { title, subtitle, description, pageCount, publisher } = data;
            const authors = data.authors[0];
            const bookImage = data?.imageLinks?.thumbnail;

            bookPageCount = pageCount;
            console.log(bookPageCount);
            bookTitle.textContent = title;
            bookSubTitle.textContent = subtitle;
            authorName.textContent = `by ${authors}`;
            bookCover.src = bookImage;
            bookPublisher.textContent = `book published by: ${publisher}`;

            modalBookCovers.children[0].src = bookImage;
            modalBookCovers.children[1].src = bookImage;

            // Only create the Read More link if description is longer than 200 characters
            if (description.length > 200) {
                const shortenedDescription = description.slice(0, 200) + '...';  // Ensure shortened version is <= 200 characters
                let isShortened = true;

                // Create the Read More/Read Less link
                const toggleLink = document.createElement('a');
                toggleLink.textContent = 'Read More';
                toggleLink.href = '#';
                toggleLink.className = 'text-gray-900 hover:text-gray-300 transition ease-in ml-2';

                // Add toggle functionality
                toggleLink.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent navigation
                    isShortened = !isShortened; // Toggle the state
                    toggleLink.textContent = isShortened ? 'Read More' : 'Read Less'; // Update link text
                    bookDescription.textContent = isShortened ? shortenedDescription : description; // Update description text

                    // Append the link only if the description is shortened
                    if (isShortened) {
                        bookDescription.appendChild(toggleLink);  // Append link only if shortened
                    } else {
                        // Re-append the link when it's in the "Read Less" state
                        bookDescription.appendChild(toggleLink);  // Keep the link when showing the full description
                    }
                });

                // Set initial description and append the link
                bookDescription.textContent = shortenedDescription;
                bookDescription.appendChild(toggleLink);
            } else {
                // If description is less than 200 characters, display it directly
                bookDescription.textContent = description;
            }
        }
    } catch (error) {
        const messageContainer = document.querySelector('#message-container');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Sorry, we can't find that book. Please try another one";
        messageContainer.append(errorMessage);

    } finally {
        hideSpinner(); // Hide spinner after fetch is complete
        toggleApp(); // Show app
        toggleIndividualBookModal(); // Show individual book modal
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent default form submission
    const searchQuery = inputSearchBar.value;  // Get value from the input search bar
    await fetchApi(apiUrl + searchQuery); // Wait for fetchApi to complete

    // console.log(toggleLink);

    // Ensure dropdownHander is called after the API response is processed
    dropdownHander(dropdown, 
        bookTitle,
        bookSubTitle,
        authorName,
        bookCover,
        bookDescription,
        bookPublisher,
        bookPageCount
    );
});


// toggles the hidden class from the #app
const toggleApp = () => { 
    app.classList.toggle('hidden');
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

// calculates percentage of way through the book, if === to 100 then it will add the book to the read category.
calculatePercentageOfBookCompletion()