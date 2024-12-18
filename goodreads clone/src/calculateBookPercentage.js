// calculates percentage of way through the book, if === to 100 then it will add the book to the read category.

// takes the book percentage calculation for how far through the book the user is and updates front end text content
export const calculatePercentageOfBookCompletion = () => {
    // Get input where the user enters the page they're up to
    const pageNumberInput = document.querySelector('#modal-user-page-number');
    const percentage = document.querySelector('#percentage');
    const doneButton = document.querySelector('#update-progress-modal-done-button');
    const currentlyReadingCategory = localStorage.getItem("currently reading");

    // Get the last/latest item in the array
    const parsedCurrentlyReadingCategory = JSON.parse(currentlyReadingCategory) || [];
    const latestBook = parsedCurrentlyReadingCategory.at(-1);

    // Grab the page count/number of pages
    const { pageCount } = latestBook || { pageCount: 0 };
    let percentageForCompletionOfBook = 0;

    pageNumberInput.addEventListener('input', (e) => {
        // Get value of input and convert it to a number
        const inputValue = e.target.value;
        const numberValue = parseInt(inputValue);
        console.log(numberValue);

        // Calculate percentage of way through the book 
        if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= pageCount) {
            percentageForCompletionOfBook = Math.floor((numberValue / pageCount) * 100);
        } else {
            percentageForCompletionOfBook = 0;
        }
    });

    doneButton.addEventListener('click', () => {
        if (percentageForCompletionOfBook >= 0 && percentageForCompletionOfBook <= 110) {
            // Update the latest book's progress
            latestBook.percentageCompleted = percentageForCompletionOfBook;

            // If the book is completed (percentage is 100), move it to the "read" category
            if (percentageForCompletionOfBook >= 100) {
                // Remove the book from "currently reading"
                parsedCurrentlyReadingCategory.pop(); // Remove the last book
                location.reload();

                // Get the "read" category data or set it to an empty array if not yet in localStorage
                const readCategory = JSON.parse(localStorage.getItem("read")) || [];

                // Add the book to the "read" category
                readCategory.push(latestBook);

                // Save the updated "read" category to localStorage
                localStorage.setItem("read", JSON.stringify(readCategory));
            }

            // Update the "currently reading" category in localStorage
            localStorage.setItem("currently reading", JSON.stringify(parsedCurrentlyReadingCategory));

            // Update the UI with the new percentage
            percentage.textContent = percentageForCompletionOfBook;
        } else {
            console.error('Invalid percentage value. Please check the input.');
        }
    });
}