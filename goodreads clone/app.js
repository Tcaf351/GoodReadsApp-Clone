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
    let fetchApi = async (url) => { // fetch api onLoad of app opening
        try {
            showSpinner(); // Show spinner when starting to fetch API
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                
                const { title, author_name, number_of_pages_median
                } = data.docs[0]; // set the book title and author name from api

                bookTitle.textContent = title; // change the element text to be the title
                authorName.textContent = author_name[0]; // change the element text to be the author name
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


// calculate percentage of way through book


// search book



// add book to want to read




// add book to read



// scan barcode of book to bring up modal