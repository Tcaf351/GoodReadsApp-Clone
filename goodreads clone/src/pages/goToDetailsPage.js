import { getUrl } from "../backArrow";
getUrl()

// This function takes the user to the dynamic book details page.
const urlParams = new URLSearchParams(window.location.search);
const bookTitle = urlParams.get('title');

// Get the referring URL
const referringURL = document.referrer;

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
    console.log(bookDetails);
    // Populate the book details on the page
    document.querySelector('.book-cover').src = bookDetails.cover;
    document.querySelector('.book-cover-background').src = bookDetails.cover;
    document.querySelector('#book-title').textContent = bookDetails.title;
    document.querySelector('#book-subtitle').textContent = bookDetails.subtitle;
    document.querySelector('#author-name').textContent = `by ${bookDetails.author}`;
    document.querySelector('#book-description').textContent = `${bookDetails.longDescription}`;

    // Only create the Read More link if description is longer than 200 characters
    const bookDescriptionElement = document.querySelector('#book-description'); // DOM element for description
    const fullDescription = bookDetails.longDescription;

    // Only create the Read More link if description is longer than 200 characters
    if (fullDescription.length > 200) {
        const shortenedDescription = fullDescription.slice(0, 200) + '...'; // Truncate the description
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
            
            if (isShortened) {
                toggleLink.textContent = 'Read More'; // Update link text
                bookDescriptionElement.textContent = shortenedDescription; // Update description
            } else {
                toggleLink.textContent = 'Read Less'; // Update link text
                bookDescriptionElement.textContent = fullDescription; // Update description
            }
            
            bookDescriptionElement.appendChild(toggleLink); // Append the link
        });

        // Set the initial shortened description and append the link
        bookDescriptionElement.textContent = shortenedDescription;
        bookDescriptionElement.appendChild(toggleLink);
    } else {
        // If the description is less than or equal to 200 characters, display it directly
        bookDescriptionElement.textContent = fullDescription;
    }
} else {
    console.error('Book not found!');
}