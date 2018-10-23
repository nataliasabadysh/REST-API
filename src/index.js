import './sass/styles.scss';


import { fetchImages } from './services/api';
import gridItemTpl from './templates/gallery-template.hbs';

const grid = document.querySelector('.grid');
const form = document.querySelector('.form');
const input = document.querySelector('.input-js');
const loader = document.querySelector('.loader-overlay');
const loadMoreBtn = document.querySelector('.load-more');


let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleFormSumit);
loadMoreBtn.addEventListener('click', hanelLoadMoreClick);

// submit
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

// loader
function toggleLoader() {
    return loader.classList.toggle('show-loader');
}



