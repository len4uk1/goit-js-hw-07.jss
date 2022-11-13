import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainerEl = document.querySelector(".gallery");
const backdropImg = basicLightbox.create(`<img >`);

galleryContainerEl.innerHTML = createGalleryMarkup(galleryItems);

addLazyloadToImg();

galleryContainerEl.addEventListener("click", onGalleryImageClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href='${original}'>
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalleryImageClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();

  const originalImgUrl = event.target.dataset.source;
  backdropImg.element().querySelector("img").src = originalImgUrl;
  backdropImg.show();

  document.addEventListener("keydown", onEscKeyDownBackdropClose);
}

function onEscKeyDownBackdropClose(event) {
  if (!(backdropImg.visible() && event.key === "Escape")) {
    return;
  }
  backdropImg.close();
  document.removeEventListener("keydown", onEscKeyDownBackdropClose);
}

function addLazyloadToImg() {
  const lazyImages = document.querySelectorAll(".gallery__image");
  if ("loading" in HTMLImageElement.prototype) {
    lazyImages.forEach((imgEl) => {
      imgEl.loading = "lazy";
    });
    const lazyScript = document.createElement("script");

  } else {
    console.log('!!!!!!!!!!!!');
    const lazyScript = document.createElement("script");

    lazyScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    lazyScript.integrity =
      "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    lazyScript.crossorigin = "anonymous";
    lazyScript.referrerpolicy = "no-referrer";
    document.body.appendChild(lazyScript);
  }
}
