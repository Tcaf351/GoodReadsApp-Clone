// calculates percentage of way through the book, if === to 100 then it will add the book to the read category.

// takes the book percentage calculation for how far through the book the user is and updates front end text content
export const calculatePercentageOfBookCompletion = () => {
    
    // get input where user enters the page they're up to
    const pageNumberInput = document.querySelector('#modal-user-page-number');
    const percentage = document.querySelector('#percentage');
    const doneButton = document.querySelector('#update-progress-modal-done-button');
    
    const wantToReadCategory = localStorage.getItem("currently reading");

    // get the last/latest item in the array
    const parsedWantToReadCategory = JSON.parse(wantToReadCategory) || [];
    const latestBook = parsedWantToReadCategory.at(-1);

    // grab the page count/number of pages
    const { pageCount } = latestBook || { pageCount: 0 };
    let percentageForCompletionOfBook = 0;
    

    pageNumberInput.addEventListener('input', (e) => {
        // get value of input and convert to a number
        const inputValue = e.target.value;
        const numberValue = parseInt(inputValue);
        
        
        // calculate percentage of way through book 
        if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= pageCount) {
            percentageForCompletionOfBook = Math.floor((numberValue / pageCount) * 100);
        } else {
            percentageForCompletionOfBook = 0;
        }
        
        console.log(percentageForCompletionOfBook);
    });

    doneButton.addEventListener('click', () => {
        if (percentageForCompletionOfBook >= 0 && percentageForCompletionOfBook <= 100) {
            // Update the latest book's progress
            latestBook.percentageCompleted = percentageForCompletionOfBook;

            // Update the array in localStorage
            localStorage.setItem("currently reading", JSON.stringify(parsedWantToReadCategory));

            // Update the UI
            percentage.textContent = percentageForCompletionOfBook;
        } else {
            console.error('Invalid percentage value. Please check the input.');
        }
    });
    
}