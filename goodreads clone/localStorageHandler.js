
// onload of application this maps through localStorage to see if any books are older than 1 day and removes them.
export const windowOnLoadLocalStorage = (categories) => {
  
    const oneDay = 24 * 60 * 60 * 1000;
    const currentTime = Date.now();

    categories.forEach(category => {
        // Get stored books for each category
        const storedBooks = JSON.parse(localStorage.getItem(category)) || [];

        // Filter books that are less than 1 day old
        const recentBooks = storedBooks.filter(book => {
            return currentTime - book.timestamp < oneDay;
        });

        if (recentBooks.length > 0) {
            // If there are recent books, log them to the console - console.log to delete later
            // recentBooks.forEach(book => {
            //     console.log(`Category: ${category}, Book:`, book);
            // });

            // Update localStorage with recent books only
            localStorage.setItem(category, JSON.stringify(recentBooks));
        } else {
            // Remove the category if all books are older than 1 day
            localStorage.removeItem(category);
            console.log(`Category "${category}" removed from localStorage (all books expired).`);
        }
    });
};


// look through localStorage to retrieve any books in the 'want to read' category.
export const windowOnLoadLocalStorageWantToRead = (categories) => {
    // onload of application search localStorage for any existing entries in want to read
    const wantToReadContainerImage = document.querySelector('#want-to-read-container img');
    const wantToReadText = document.querySelector('#want-to-read-container p');

    const wantToReadString = localStorage.getItem(categories[0]);
    const wantToReadParsed = JSON.parse(wantToReadString);

    //  map over want to read and display
    // wantToReadParsed.map((wantToReadParse) => {
    //     wantToReadContainerImage.src = wantToReadParse.cover;
    // });
    // wantToReadText.innerHTML = `${wantToReadParsed.length.toString()} books`;
}

export const windowOnLoadLocalStorageRead = (categories) => {
    // onload of application search localStorage for any existing entries in read
    const readContainerImage = document.querySelector('#read-container img');
    const readText = document.querySelector('#read-container p');

    const readString = localStorage.getItem(categories[2]);
    const readParsed = JSON.parse(readString);

    // map over read and display
    // readParsed.map((readParse) => {
    //     readContainerImage.src = readParse.cover;
    // });
    // readText.innerHTML = `${readParsed.length.toString()} books`;
}

export const windowOnLoadLocalStorageCurrentlyReading = (categories) => {
    // onload of application search localStorage for any existing entries in read
    const currentlyReadingContainerImage = document.querySelector('#currently-reading-container img');
    const authorName = document.querySelector('#currently-reading-container .author-name')

    const currentlyReadingString = localStorage.getItem(categories[1]);
    const currentlyReadingParsed = JSON.parse(currentlyReadingString);
    console.log(currentlyReadingParsed);

    currentlyReadingParsed.map((currentlyReadingParse) => {
        currentlyReadingContainerImage.src = currentlyReadingParse.cover;
        authorName.innerHTML = currentlyReadingParse.author;
    });
}


// the pageCount is getting overridden by the dropdownhander