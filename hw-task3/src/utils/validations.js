import { fixImageOrientation } from './imageService';

export function loadAndValidateImage(f) {
  return new Promise((resolve, reject) => {
    let error = '';

    console.log(f.type, f);
    if (!/image\/jpe?g/.test(f.type) && !/image\/png/.test(f.type)) {
      error = 'File format jpg/jpeg and png only';
      reject(error);
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      error = 'Image should not exceed 5MB';
      reject(error);
      return;
    }

    //check dimensions
    const image = document.createElement('img');
    image.src = window.URL.createObjectURL(f);
    console.log('object url', image.src);
    image.style.position = 'fixed';
    image.style.visibility = 'hidden';
    image.style.pointerEvents = 'none';
    image.onerror = () => {
      error = 'Please choose not broken image';
      if (image.parentElement) image.parentElement.removeChild(image);
      reject(error);
    };
    image.onload = async () => {
      const width = image.offsetWidth;
      const height = image.offsetHeight;
      if (width < 300 || height < 300) {
        error = 'The minimum size of image is 300x300';
        reject(error);
      }
      const { imageUrl } = await fixImageOrientation(image, f.type);
      if (image.parentElement) image.parentElement.removeChild(image);
      resolve({ imageUrl, dimensions: { width, height } });
    };
    document.getElementById('root').appendChild(image);
  });
}
