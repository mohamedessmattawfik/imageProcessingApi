import sharp, { Sharp } from 'sharp';

const imageResize = (
  imagePath: string,
  width: number,
  height: number
): Sharp => {
  try {
    return sharp(imagePath).resize(width, height);
  } catch (error) {
    throw new Error(error as string);
  }
};

export default imageResize;
