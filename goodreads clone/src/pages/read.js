// in the wantToRead html file
const readBookContainer = document.querySelector('#individual-read-book');

// fetch from localStorage
const readString = localStorage.getItem('read');
const readParsed = JSON.parse(readString) || [];

// map over localStorage
const readBooks = readParsed.map((readParse) => {
    console.log(readParse);
    // Create a div element and use innerHTML
    const dynamicBookDiv = document.createElement('div'); 
    dynamicBookDiv.classList.add('lg:w-1/2', 'lg:mx-auto', 'flex', 'border-b', 'border-b-gray-300');
    dynamicBookDiv.innerHTML = `
        <div id="book-covers" class="relative h-full flex items-center justify-center">
            <img class="book-cover inset-0 z-30 py-3" src="" alt="book cover">
        </div>
        <div class="h-full w-full ml-4">
            <h1 class="book-title text-xl text-start mt-2 my-1"></h1>
            <h3 class="book-subtitle text-md text-start"></h3>
            <p class="author-name text-sm text-start my-1"></p>
        </div>
    `;
    // Append the created element to the container
    readBookContainer.append(dynamicBookDiv);

    // Dynamically select elements within the newly created div
    const bookCoverImg = dynamicBookDiv.querySelector('.book-cover');
    const bookTitle = dynamicBookDiv.querySelector('.book-title');
    const bookSubtitle = dynamicBookDiv.querySelector('.book-subtitle');
    const authorName = dynamicBookDiv.querySelector('.author-name');

    // Populate the data into the selected elements
    bookCoverImg.src = readParse.cover;
    bookTitle.textContent = readParse.title;
    bookSubtitle.textContent = readParse.subtitle;
    authorName.textContent = `by ${readParse.author}`;
});