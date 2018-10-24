import './sass/styles.scss';

import { fetchImages } from './services/api';
import gridItemTpl from './templates/gallery-template.hbs';



// start API URL

const grid = document.querySelector('.grid');
const form = document.querySelector('.form');
const input = document.querySelector('.input-js');
const pageLoader = document.querySelector('.page');
const loadMoreBtn = document.querySelector('.load-more');


let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleFormSumit);
loadMoreBtn.addEventListener('click', hanelLoadMoreClick);

function handleFormSumit(e) {
    e.preventDefault();

    resetCurrentPage();
    resetPhotosGrid();

    currentQuery = input.value;
    handleFetch({ query: currentQuery,  count: 12, page: currentPage, });

    e.target.reset();
    showLoadMoreBtn();
}

function handleFetch(params) {
    toggleLoader();

    fetchImages(params).then(photos => {
        const markup = createGridItems(photos);
        updatePhotosGrid(markup);
        toggleLoader();
    });
}
function resetCurrentPage() {
    currentPage = 1;
}
function resetPhotosGrid() {
    grid.innerHTML = '';
}
function incrementCurrentPage() {
    currentPage += 1;
}

function showLoadMoreBtn() {
    if (!loadMoreBtn.classList.contains('visible')) {
        loadMoreBtn.classList.add('visible');
    }
}
function hanelLoadMoreClick() {
    incrementCurrentPage();
    handleFetch({ query: currentQuery,  count: 12, page: currentPage, });
}

//  to gallery-template.hbs
function createGridItems(items) {
    return items.reduce((markup, item) => markup + gridItemTpl(item), '');
}
function updatePhotosGrid(markup) {
    grid.insertAdjacentHTML('beforeend', markup);
}
function toggleLoader() {
     pageLoader.classList.toggle('show-loader');
}
// end API URL

// MODAL START

const page = document.querySelector('.page-modal');
const openModalBtn = document.querySelector('.grid'); // нужно брать target у
const closeModalBtn = document.querySelector('button[data-action="close-modal"]');

openModalBtn.addEventListener('click', handleOpenModal);
function handleOpenModal() {
    page.classList.add('show-modal');
    window.addEventListener('keydown', handleModalEscPress);
}
closeModalBtn.addEventListener('click', handleCloseModal);
function handleCloseModal() {
    page.classList.remove('show-modal');
    window.removeEventListener('keydown', handleModalEscPress);
}
function handleModalEscPress(evt) {
    const key = evt.code;
    if(key === "Escape"){
        handleCloseModal();
    }
}

// MODAL END


