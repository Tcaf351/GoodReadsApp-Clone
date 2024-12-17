export function dropdownHander(dropdown, bookTitle, bookSubTitle, authorName, bookCover, originalDescription, bookDescription, bookPublisher, bookPageCount) {
    console.log(bookDescription);

    dropdown.addEventListener('change', function() {
        const selectedOption = this.value;

        // book data to be saved to localStorage
        const bookData = {
            title: bookTitle.textContent,
            subtitle: bookSubTitle.textContent,
            cover: bookCover.currentSrc,
            originalDescription: originalDescription.textContent,
            description: bookDescription.textContent, // Store the shortened description (before "Read More" is toggled)
            author: authorName.textContent.slice(3),  // Removing "by " from author name
            publisher: bookPublisher.textContent.slice(19),  // Adjust this slicing if needed
            timestamp: Date.now(),
            pageCount: bookPageCount,  // Should be correctly passed now
            percentageCompleted: 0
        };

        console.log("bookData:", bookData);  // Ensure bookData is correct

        // LocalStorage logic remains the same
        const addToLocalStorage = (key, bookData) => {
            const errorMessageContainer = document.querySelector('#message-container');
            errorMessageContainer.textContent = ''; // clears previous message

            let storedBooks = JSON.parse(localStorage.getItem(key)) || [];

            if (!storedBooks.some(book => book.title === bookData.title)) {
                storedBooks.push(bookData);
                localStorage.setItem(key, JSON.stringify(storedBooks));
            } else {
                const errorMessage = document.createElement('span');
                errorMessage.textContent = `Sorry ${bookData.title} already exists in ${key}.`;
                errorMessageContainer.append(errorMessage);
            }
        };

        const dropdownSubmitButton = document.querySelector('#dropdown-button-submit');
        dropdownSubmitButton.addEventListener('click', () => {
            const errorMessageContainer = document.querySelector('#message-container');
            const errorMessage = document.createElement('span');

            switch (selectedOption) {
                case 'want to read':
                    addToLocalStorage('want to read', bookData);
                    location.reload();
                    break;
                case 'currently reading':
                    addToLocalStorage('currently reading', bookData);
                    location.reload();
                    break;
                case 'read':
                    addToLocalStorage('read', bookData);
                    location.reload();
                    break;
                default:
                    errorMessage.textContent = 'No valid option selected. Please try again';
                    errorMessageContainer.append(errorMessage);
                    break;
            }
        });
    });
}