import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import imageResize from '../../services/imageService';
import { existsSync } from 'fs';
import NodeCache from 'node-cache';

const imageRoutes = Router();
const cacheMemory = new NodeCache({ stdTTL: 20 });

const checkCache = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const imageUrl = req.url;
    if (cacheMemory.has(imageUrl)) {
      return res.status(200).sendFile(cacheMemory.get(imageUrl) as string);
    }
    next();
  } catch (error) {
    throw new Error(error as string);
  }
};

const checkValidParams = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { fileName, width, height } = req.query;
  if (fileName === undefined || fileName === '') {
    return res.status(400).send(' You must enter file name');
  }
  if (width === undefined || width === '') {
    return res.status(400).send(' You must specify width');
  }
  if (height === undefined || height === '') {
    return res.status(400).send(' You must specify height');
  }
  next();
};
imageRoutes.get(
  '/',
  checkValidParams,
  checkCache,
  async (req: Request, res: Response) => {
    const fileName = req.query.fileName;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const imagePath =
      path.resolve('./') + `/public/inputImages/${fileName}.jpeg`;
    const outputPath =
      path.resolve('./') + `/public/outputImages/${fileName}.jpeg`;

    if (existsSync(imagePath)) {
      try {
        const outputImage = imageResize(imagePath, width, height);
        await outputImage.toFile(outputPath).then(() => {
          cacheMemory.set(req.url, outputPath);
          res.status(200).sendFile(outputPath);
        });
      } catch (error) {
        res.status(404).send('Error');
      }
    } else {
      res.status(404).send('File Not found');
    }
  }
);

export default imageRoutes;
