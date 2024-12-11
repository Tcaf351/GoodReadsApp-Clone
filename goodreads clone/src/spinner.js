// get spinner
export const spinner = document.querySelector('.loader');

// show spinner
export const showSpinner = () => { 
    spinner.classList.remove('hidden')
};

// hide spinner
export const hideSpinner = () => { 
    spinner.classList.add('hidden');
};