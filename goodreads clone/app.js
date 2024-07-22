const spinner = document.querySelector('.loader'); // get spinner
const app = document.querySelector('#app'); // get app


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
    // let fetchApi = async (url) => { // fetch api onLoad of app opening
    //     try {
    //         showSpinner(); // Show spinner when starting to fetch API
    //         const response = await fetch(url);

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         } else {
    //             const data = await response.json();
    //             console.log(data);
                
    //             const { title, author_name, number_of_pages_median
    //             } = data.docs[0]; // set the book title and author name from api

    //             bookTitle.textContent = title; // change the element text to be the title
    //             authorName.textContent = author_name[0]; // change the element text to be the author name
    //         }
    //     } catch (error) {
    //         console.error('Error fetching API:', error);
    //     } finally {
    //         hideSpinner(); // Hide spinner after fetch is complete
            toggleApp(); // show app
    //     }
    // };

    // fetchApi(apiUrl);
};


// get update progress button to open modal
const updateProgressButton = document.getElementsByTagName('button')[3]; 

// togggle modal
const modal = document.querySelector('.modal'); // get modal

const modalDoneButton = document.getElementsByTagName('button')[1]; // get done button to close modal
const modalCancelButton = document.getElementsByTagName('button')[0]; // get cancel button to close modal

// open model
const openModal = () => {
    modal.classList.remove('hidden');
};

// close modal
const closeModal = () => {
    modal.classList.add('hidden');
};

// open modal event listener
updateProgressButton.addEventListener('click', openModal);

// cancel button on modal closes model
modalCancelButton.addEventListener('click', closeModal);

// done button on modal also closes button
modalDoneButton.addEventListener('click', closeModal);


// done button fires function that closes modal, updates percentage if update has been entered else no change in percentage


// calculate percentage of way through book


// search book



// add book to want to read




// add book to read



// finished book button to add book to read




// if percentage of book == 100% add book to read



// scan barcode of book to bring up modal