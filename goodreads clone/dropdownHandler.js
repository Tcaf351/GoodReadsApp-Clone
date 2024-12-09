// Function to handle the dropdown with 'want to read', 'read', 'currently reading'

export function dropdownHander(dropdown, bookTitle, bookSubTitle, authorName, bookCover, bookDescription, bookPublisher, ratingAverage, bookPageCount) {
    dropdown.addEventListener('change', function() {
        const selectedOption = this.value;
    
    // book data to be saved to localStorage
        const bookData = {
            title: bookTitle.textContent,
            subtitle: bookSubTitle.textContent,
            cover: bookCover.currentSrc,
            description: bookDescription.textContent,
            author: authorName.textContent.slice(3),
            publisher: bookPublisher.textContent.slice(19),
            rating: ratingAverage.textContent,
            timestamp: Date.now(),
            pageCount: bookPageCount
        };

        console.log(bookData.pageCount);
    
        // switch case for dropdown options. Convert data to string for localStorage
        const addToLocalStorage = (key, bookData) => {
            const errorMessageContainer = document.querySelector('#message-container');
            errorMessageContainer.textContent = ''; // clears previous message
    
            // Retrieve existing books for the selected status (change to json) & if nothing exists then enter empty array
            let storedBooks = JSON.parse(localStorage.getItem(key)) || [];
    
            // Check if the book already exists (to avoid duplicates)
            if (!storedBooks.some(book => book.title === bookData.title)) {
    
                // Add new book to the array
                storedBooks.push(bookData);
    
                // Save the updated array back to local storage
                localStorage.setItem(key, JSON.stringify(storedBooks));
                } else {
                    const errorMessage = document.createElement('span');
                    errorMessage.textContent = `Sorry ${bookData.title} already exists in ${key}.`
                    errorMessageContainer.append(errorMessage);
                }
            };
            
    
        const dropdownSubmitButton = document.querySelector('#dropdown-button-submit');
        dropdownSubmitButton.addEventListener('click', () => {
            const errorMessageContainer = document.querySelector('#message-container');
            const errorMessage = document.createElement('span');
            switch (selectedOption) {
                case 'want to read':
                    console.log(localStorage.getItem(bookData));
                    // if book is already in localStorage send error, 'sorry book already exists'
                        addToLocalStorage('want to read', bookData);
                    break;
                
                case 'currently reading':
                    // if book is already in localStorage send error, 'sorry book already exists'
                    addToLocalStorage('currently reading', bookData);
                    break;
        
                case 'read':
                    // if book is already in localStorage send error, 'sorry book already exists'
                    addToLocalStorage('read', bookData);
                    break;
            
                default:
                    // const errorMessageContainer = document.querySelector('#message-container');
                    // const errorMessage = document.createElement('span');
                    errorMessage.textContent = 'No valid option selected. Please try again';
                    errorMessageContainer.append(errorMessage);
                    break;
            }
        });
    });
}