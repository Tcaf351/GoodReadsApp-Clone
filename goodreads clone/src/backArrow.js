export const getUrl = () => {
    const currentPath = window.location.pathname;
    const backArrow = document.querySelector('#back-arrow');

    // Check if the path is not "/"
    if (currentPath === '/') {
        // Select the element and remove the class
        if (backArrow) {
            backArrow.classList.add('hidden');
        }
    }

    if (backArrow) {
        backArrow.addEventListener('click', () => {
            // send user back to homescreen
            window.location.href = "/";
        });
    }
}