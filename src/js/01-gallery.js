import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = creatImagesMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

galleryContainer.addEventListener('click', onImagesContainerClick);



function creatImagesMarkup (galleryItems) {
    const markup = galleryItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
         alt="${description}"
        />
        </a>
        </div>
        `;
    }).join('');
    return markup;
}

function onImagesContainerClick (event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    const selectedImage = event.target.dataset.source;
    
    const instance = basicLightbox.create(`
    <img src="${selectedImage}" width="800" height="600">
`)

instance.show()

galleryContainer.addEventListener ('keydown', event => {
    if (event.key === 'Escape') {
        instance.close();
    }
})
  
}
