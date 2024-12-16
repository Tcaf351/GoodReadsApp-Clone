import { getUrl } from "../backArrow";
getUrl()

// This function takes the user to the dynamic book details page.
const urlParams = new URLSearchParams(window.location.search);
const bookTitle = urlParams.get('title');

// Get the referring URL
const referringURL = document.referrer;
console.log(referringURL);

const currentPath = window.location.pathname;

// Remove button
const removeButton = document.querySelector('#remove-button');

// Declare bookDetails in a higher scope
let bookDetails = null;

if (referringURL.includes('/read')) {
    // Fetch data from localStorage to match the book title
    const readString = localStorage.getItem('read');
    const readParsed = JSON.parse(readString) || [];

    // Find the book based on the title
    bookDetails = readParsed.find(book => book.title === bookTitle);
    console.log(bookDetails);

    removeButton.addEventListener('click', () => {
        // Filter out the book with the matching title
        const updatedArray = readParsed.filter(book => book.title !== bookTitle);
    
        // Update localStorage with the filtered array
        localStorage.setItem('read', JSON.stringify(updatedArray));
    
        // refresh the page/send user back to homepage
        window.location.href = "/";
    });
    
}
else if (referringURL.includes('/wantToRead')) {
    // Fetch data from localStorage to match the book title
    const wantToReadString = localStorage.getItem('want to read');
    const wantToReadParsed = JSON.parse(wantToReadString) || [];

    // Find the book based on the title
    bookDetails = wantToReadParsed.find(book => book.title === bookTitle);
    console.log(bookDetails);

    removeButton.addEventListener('click', () => {
        // Filter out the book with the matching title
        const updatedArray = wantToReadParsed.filter(book => book.title !== bookTitle);
    
        // Update localStorage with the filtered array
        localStorage.setItem('want to read', JSON.stringify(updatedArray));
    
        // refresh the page/send user back to homepage
        window.location.href = "/";
    });
}
else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Sorry, please try again';
}

// Check if bookDetails was found and populate the page
if (bookDetails) {
    // Populate the book details on the page
    document.querySelector('.book-cover').src = bookDetails.cover;
    document.querySelector('.book-cover-background').src = bookDetails.cover;
    document.querySelector('#book-title').textContent = bookDetails.title;
    document.querySelector('#book-subtitle').textContent = bookDetails.subtitle;
    document.querySelector('#author-name').textContent = `by ${bookDetails.author}`;
    document.querySelector('#book-description').textContent = `${bookDetails.description}`;
} else {
    console.error('Book not found!');
}