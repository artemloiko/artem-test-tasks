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
    const image = new Image();
    image.src = window.URL.createObjectURL(f);
    image.onerror = () => {
      error = 'Please choose not broken image';
      reject(error);
    };
    image.onload = async () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (width < 300 || height < 300) {
        error = 'The minimum size of image is 300x300';
        reject(error);
      }
      const { imageUrl } = await fixImageOrientation(image, f.type);
      resolve({ imageUrl, dimensions: { width, height } });
    };
  });
}
