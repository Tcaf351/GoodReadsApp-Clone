// import back arrow
import { getUrl } from "../backArrow";
getUrl();

// in the wantToRead html file
const wantToReadBookContainer = document.querySelector('#individual-want-to-read-book');

// fetch from localStorage
const wantToReadString = localStorage.getItem('want to read');
const wantToReadParsed = JSON.parse(wantToReadString) || [];

// map over localStorage
wantToReadParsed.map((wantToReadParse) => {
    // Create a div element and use innerHTML
    const dynamicBookDiv = document.createElement('div'); 
    dynamicBookDiv.classList.add('lg:w-4/5', 'lg:mx-auto', 'flex', 'border-b', 'border-b-gray-300');
    dynamicBookDiv.innerHTML = `
        <a href="/book-details.html?title=${encodeURIComponent(wantToReadParse.title)}" class="relative h-full flex items-center justify-center">
            <div id="book-covers" class="">
                <img class="book-cover inset-0 z-30 py-3" src="" alt="book cover">
            </div>
            <div class="h-full w-full ml-4">
                <h1 class="book-title text-md text-start mt-2 my-1"></h1>
                <h3 class="book-subtitle text-sm text-start"></h3>
                <p class="author-name text-sm text-start my-1"></p>
            </div>
        </a>
    `;
    // Append the created element to the container
    wantToReadBookContainer.append(dynamicBookDiv);

    // Dynamically select elements within the newly created div
    const bookCoverImg = dynamicBookDiv.querySelector('.book-cover');
    const bookTitle = dynamicBookDiv.querySelector('.book-title');
    const bookSubtitle = dynamicBookDiv.querySelector('.book-subtitle');
    const authorName = dynamicBookDiv.querySelector('.author-name');

    // Populate the data into the selected elements
    bookCoverImg.src = wantToReadParse.cover;
    bookTitle.textContent = wantToReadParse.title;
    bookSubtitle.textContent = wantToReadParse.subtitle;
    authorName.textContent = `by ${wantToReadParse.author}`;
});