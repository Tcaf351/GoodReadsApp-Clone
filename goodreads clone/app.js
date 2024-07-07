const spinner = document.querySelector('.loader');
const app = document.querySelector('#app');


const bookTitle = document.querySelector('.book-title');
const authorName = document.querySelector('.author-name');


const showSpinner = () => {
        spinner.classList.remove('hidden')
        spinner.classList.remove('none')
        console.log('show spinner');
};

const hideSpinner = () => {
        spinner.classList.add('hidden');
        spinner.classList.remove('inline-block');
        console.log('hide spinner');
};

const toggleApp = () => {
    app.classList.remove('hidden');
};



// api
const apiUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings';

window.onload = () => {
    let fetchApi = async (url) => {
        try {
            showSpinner(); // Show spinner when starting to fetch API
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                
                // const { title, author_name } = data.docs[0];
                // bookTitle.textContent = title;
                // authorName.textContent = author_name;
            }
        } catch (error) {
            console.error('Error fetching API:', error);
        } finally {
            hideSpinner(); // Hide spinner after fetch is complete
            toggleApp();
        }
    };

    fetchApi(apiUrl);
};