export const getUrl = () => {
    const currentPath = window.location.pathname;
    const backArrow = document.querySelector('#back-arrow');

    // Check if the path is not "/"
    if (currentPath !== '/wantToRead' && currentPath !== '/read') {
        // Select the element and remove the class
        if (backArrow) {
            backArrow.classList.add('hidden');
        }
    }

    if (backArrow) {
        backArrow.addEventListener('click', () => {
            // console.log('click');
            window.location.href = "/";
        });
    }
}