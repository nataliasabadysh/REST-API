export const imagesOnThePage = []
const backdrop = {
	currentImage: document.querySelector('.page-modal img'),
	nextImage: "",
	prevImage: "",
	currentImgIndex: 0,

	getNextImage() {
		if (backdrop.currentImgIndex === imagesOnThePage.length - 1) return;
		backdrop.currentImgIndex += 1;
		return backdrop.nextImage = imagesOnThePage[backdrop.currentImgIndex];
	},
	getPrevImage() {
		if (backdrop.currentImgIndex === 0) return;
		backdrop.currentImgIndex -= 1;
		return backdrop.prevImage = imagesOnThePage[backdrop.currentImgIndex];
	}
}

export const showCurrentImage = (target) => {
	imagesOnThePage.length = 0;
	const allImg = document.querySelectorAll('.grid__item img')
	allImg.forEach(img => {	imagesOnThePage.push(img)	});

	backdrop.currentImgIndex = imagesOnThePage.indexOf(target);
	backdrop.getPrevImage();
	backdrop.getNextImage();

	return backdrop.currentImage;

}

export const showPrevImage = () => {
	backdrop.getPrevImage();
	backdrop.currentImage = backdrop.prevImage;
	return backdrop.currentImage
}

export const showNextImage = () => {
	backdrop.getNextImage();
	backdrop.currentImage = backdrop.nextImage;
	return backdrop.currentImage
}

export const closeModal = () => {
	backdrop.nextImage = "";
	backdrop.prevImage = "";
}