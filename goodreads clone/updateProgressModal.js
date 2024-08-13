// togggle modal
const modal = document.querySelector('.modal'); // get modal
export const overlay = document.querySelector('.overlay') // get modal overlay

// get done button to close modal
export const modalDoneButton = document.querySelector('#update-progress-modal-done-button');

// get cancel button to close modal
export const modalCancelButton = document.querySelector('.cancel-button'); 

// open model
export const openModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove("hidden");
};

// close modal
export const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add("hidden");
};