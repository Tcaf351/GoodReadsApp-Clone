const app = document.querySelector('#app'); // get app


const spinner = document.querySelector('.loader'); // get spinner

const showSpinner = () => { // show spinner
        spinner.classList.remove('hidden')
};

const hideSpinner = () => { // hide spinner
        spinner.classList.add('hidden');
};

const toggleApp = () => { // removes hidden class from the app to show app
    app.classList.remove('hidden');
};


const bookTitle = document.querySelector('.book-title'); // get book's title
const authorName = document.querySelector('.author-name'); // get authors name


// api
const apiUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings';

window.onload = () => {
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
};


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

// open modal event listener
updateProgressButton.addEventListener('click', openModal);

// cancel button on modal closes model
modalCancelButton.addEventListener('click', closeModal);

// done button on modal also closes button
modalDoneButton.addEventListener('click', () => {
    // close modal function but updates book percentage when done
    modal.classList.add('hidden');
    overlay.classList.add("hidden");
    percentage.textContent = userBookPercentage;
});

// close modal when user clicks outside of modal container
overlay.addEventListener('click', closeModal);


// done button fires function that closes modal, updates percentage if update has been entered else no change in percentage


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