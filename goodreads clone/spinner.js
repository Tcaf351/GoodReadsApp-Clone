// get spinner
const spinner = document.querySelector('.loader');

// get app
export const app = document.querySelector('#app');

// show spinner
export const showSpinner = () => { 
    spinner.classList.remove('hidden')
};

// hide spinner
export const hideSpinner = () => { 
    spinner.classList.add('hidden');
};


// removes hidden class from the app to show app
export const toggleApp = () => { 
    app.classList.remove('hidden');
};