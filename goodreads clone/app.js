// api
const apiUrl = 'https://openlibrary.org/search.json';

// fetch api
const fetchApi = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        else {
            const apiResults = await response.json();
            console.log(apiResults);
        }

    } catch (error) {
        console.error('Error fetching API:', error);
    }
};
fetchApi(apiUrl)