import EXIF from 'exif-js';
import { imageProcessor, resize, sharpen } from 'ts-image-processor';

const orientateCanvas = (context, img, orientation) => {
  context.canvas.width = img.naturalWidth;
  context.canvas.height = img.naturalHeight;
  switch (orientation) {
    case 2:
      // horizontal flip
      context.translate(context.canvas.width, 0);
      context.scale(-1, 1);
      break;
    case 3:
      // 180° rotate left
      context.translate(context.canvas.width, context.canvas.height);
      context.rotate(Math.PI);
      break;
    case 4:
      // vertical flip
      context.translate(0, context.canvas.height);
      context.scale(1, -1);
      break;
    case 5:
      // vertical flip + 90 rotate right
      context.canvas.height = img.naturalWidth;
      context.canvas.width = img.naturalHeight;
      context.rotate(0.5 * Math.PI);
      context.scale(1, -1);
      break;
    case 6:
      // 90° rotate right
      context.canvas.height = img.naturalWidth;
      context.canvas.width = img.naturalHeight;
      context.rotate(0.5 * Math.PI);
      context.translate(0, -context.canvas.width);
      break;
    case 7:
      // horizontal flip + 90 rotate right
      context.rotate(0.5 * Math.PI);
      context.canvas.height = img.naturalWidth;
      context.canvas.width = img.naturalHeight;
      context.translate(context.canvas.height, -context.canvas.width);
      context.scale(-1, 1);
      break;
    case 8:
      // 90° rotate left
      context.canvas.height = img.naturalWidth;
      context.canvas.width = img.naturalHeight;
      context.rotate(-0.5 * Math.PI);
      context.translate(-context.canvas.height, 0);
      break;
    default:
      console.log('default');
  }
  context.drawImage(img, 0, 0);
  return context;
};

export const fixImageOrientation = img => {
  return new Promise(resolve => {
    let imageUrl = null;
    EXIF.getData(img, function() {
      const orientation = EXIF.getTag(this, 'Orientation');
      let context = document.createElement('canvas').getContext('2d');
      context = orientateCanvas(context, img, orientation);
      imageUrl = context.canvas.toDataURL();
      resolve({ imageUrl });
    });
  });
};

export const getImageResolution = image => {
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(image);
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);

      resolve({ width, height });
    };
    img.onerror = () => {
      resolve('Damaged file');
    };
  });
  return promise;
};

export async function resizeImage(imageBase64, newSize) {
  // Use any of the functions with an existing blob (base64-string)
  return imageProcessor.src(imageBase64).pipe(
    resize({ maxWidth: newSize.width, maxHeight: newSize.height }),
    sharpen()
  );
}
