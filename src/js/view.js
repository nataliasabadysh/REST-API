import gridItemTpl from '../templates/gallery-template.hbs';

export default class View {

	constructor() {
		this.refs = {};

		this.refs.grid = document.querySelector('.grid');
		this.refs.form = document.querySelector('.form');
		this.refs.input = document.querySelector('.input-js');
		this.refs.loader = document.querySelector('.page');
		this.refs.loadMoreBtn = document.querySelector('.grid__load-more');
		this.refs.backdrop = document.querySelector('.backdrop');
		this.refs.modalPage = document.querySelector('.page-modal');
		this.refs.modalImg = document.querySelector('.page-modal__img');
		this.refs.closeModalBtn = document.querySelector('button[data-action="close-modal"]')
		this.refs.favoriteModalBtn = document.querySelector('button[data-action="favorite"]')
		this.refs.showFavorite = document.querySelector('.favorites__link')
	}

	showLoadMoreBtn() {
		if (!this.refs.loadMoreBtn.classList.contains('visible')) {
			this.refs.loadMoreBtn.classList.add('visible');
		}
	}

	createGridItems(items) {
		return items.reduce((markup, item) => markup + gridItemTpl(item), '');
	}

	updatePhotosGrid(markup) {
		this.refs.grid.insertAdjacentHTML('beforeend', markup);
	}

	resetPhotosGrid() {
		this.refs.grid.innerHTML = '';
	}

	toggleLoader() {
		return this.refs.loader.classList.toggle('show-loader');
	}

	changeColorFavoriteBtn(color) {
		this.refs.favoriteModalBtn.style.color = color
	}

	changeDisplayElem(elem, string) {
		elem.style.display = string
	}
}