import { getImages } from './services/api';

import { imagesOnThePage } from './services/modal';

export default class Controller {

	constructor(model, view) {
		this._model = model;
		this._view = view;
		this.images = this._model.localImages;
		this.imagesOnPage = imagesOnThePage;

		this._view.refs.form.addEventListener('submit',
			this.handleFormSumit.bind(this));

		this._view.refs.loadMoreBtn.addEventListener('click',
			this.handleLoadMoreClick.bind(this));

		this._view.refs.grid.addEventListener('click',
			this.handleOpenModal.bind(this));

		this._view.refs.modalPage.addEventListener('click',
			this.handleModalControls.bind(this));

		this._view.refs.closeModalBtn.addEventListener('click',
			this.handleCloseModal.bind(this));

		this._view.refs.showFavorite.addEventListener('click',
			this.handleShowFavorite.bind(this));

		this.init();
	}

	init() {
		this._model.addToLocalStorage(this.images)
	}

	// SUBMIT

	handleFormSumit(e) {
		e.preventDefault();
		this.imagesOnPage = []

		this._model.resetCurrentPage();
		this._view.resetPhotosGrid();
		this._model.currentQuery = this._view.refs.input.value;
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});

		this._view.refs.form.reset();
		this._view.showLoadMoreBtn();
	}

	handleFetch(params) {
		this._view.toggleLoader();

		getImages(params).then(photos => {
			const markup = this._view.createGridItems(photos);
			this._view.updatePhotosGrid(markup);
			this._view.toggleLoader();
		});
	}

	//LOAD MORE

	handleLoadMoreClick() {
		this._model.incrementCurrentPage();
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});
	}

	//MODAL

	handleOpenModal(evt) {
		this._model.backdropImageInit(evt.target)
		this.changeColorFavorite(evt.target)
		this._view.changeDisplayElem(this._view.refs.backdrop, "flex")
		window.addEventListener('keydown', this.handleModalEscPress.bind(this));
	}

	handleModalEscPress(evt) {
		const key = evt.code;
		if (key === "Escape") {
			this.handleCloseModal();
		}
	}

	handleCloseModal() {
		this._view.refs.backdrop.classList.remove('show-modal');
		this._view.changeDisplayElem(this._view.refs.backdrop, "none")
		window.removeEventListener('keydown', this.handleModalEscPress.bind(this));
	}

	//FAVORITE

	handleShowFavorite() {
		if (this.images.length === 0) {
			alert('Вы ничего не добавили в избранное')
		}
		this._view.refs.loadMoreBtn.classList.remove('visible')
		this._view.refs.grid.textContent = '';
		const markup = this._view.createGridItems(this.images);
		this._view.updatePhotosGrid(markup);
	}

	//CONTROLL
	handleModalControls() {

		const target = event.target;

		if (target.nodeName !== "BUTTON") return;

		const action = target.dataset.action;

		switch (action) {
			case 'next':
				const nextImg = this._model.backdropShowNextImage()
				this._view.refs.modalImg.src = nextImg.src
				this._view.refs.modalImg.id = nextImg.id
				this.changeColorFavorite(nextImg)
				break;

			case 'prev':
				const prevImg = this._model.backdropShowPrevImage();
				this._view.refs.modalImg.src = prevImg.src
				this._view.refs.modalImg.id = prevImg.id
				this.changeColorFavorite(prevImg)
				break;

			case 'favorite':
				const imgUrl = this._view.refs.modalImg.getAttribute("src")
				const imgId = this._view.refs.modalImg.getAttribute("id")

				if (this._model.isHasId(imgId, this.images)) {
					this.images = this.images.filter(obj => obj.id !== imgId)
					this._model.addToLocalStorage(this.images)

					this._view.changeColorFavoriteBtn("#ffffff")
					return
				}

				this._view.changeColorFavoriteBtn("#eeed11")
				
				const obj = {
					id: imgId,
					webformatURL: imgUrl,
				}

				this.images.push(obj)
				this._model.addToLocalStorage(this.images)
				break;

			case 'close-modal':
				this._view.refs.backdrop.classList.remove('show-modal');
				this._view.refs.backdrop.style.display = "none"
				window.removeEventListener('keydown', this.handleModalEscPress.bind(this));
				this._model.backdropCloseModal();
				break;
		}
	}

	changeColorFavorite(elem) {
		const imgUrl = elem.getAttribute("src")
		this._view.refs.modalImg.setAttribute("src", imgUrl)

		const imgId = elem.getAttribute("id")
		this._view.refs.modalImg.setAttribute("id", imgId)

		this._model.isHasId(imgId, this.images) ?
			this._view.changeColorFavoriteBtn("#eeed11") :
			this._view.changeColorFavoriteBtn("#ffffff")
	}
}