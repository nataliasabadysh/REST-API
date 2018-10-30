import * as modal from './services/modal'

export default class Model {

	constructor() {
		this.currentQuery = '';
		this.currentPage = 1;
		this.localImages = JSON.parse(localStorage.getItem('images'));

		if (this.localImages === null || this.localImages.length === 0) {
			this.localImages = []
		}
	}

	resetCurrentPage() {
		this.currentPage = 1;
	}

	incrementCurrentPage() {
		this.currentPage += 1;
	}

	addToLocalStorage(arr) {
		const jsonObj = JSON.stringify(arr);
		localStorage.setItem(`images`, jsonObj);
	}

	isHasId(id, arr) {
		return arr.some(obj => (obj.id === id))
	}

	backdropImageInit(selectedImage) {
		return modal.showCurrentImage(selectedImage);
	}

	backdropShowNextImage() {
		return modal.showNextImage();
	}

	backdropShowPrevImage() {
		return modal.showPrevImage();
	}

	backdropCloseModal() {
		return modal.closeModal();
	}
}