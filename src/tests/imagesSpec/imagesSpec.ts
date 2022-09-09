import supertest from 'supertest';
import app from '../../index';
import path from 'path';
import imageResize from '../../services/imageService';

const request = supertest(app);
const testWidth = 300;
const testHeight = 400;
const imagePath =
  path.resolve('./') + '/public/inputImages/icelandwaterfall.jpeg';

describe('Testing images end point', () => {
  it('should return an error when passing no fileName paramter', async () => {
    await request.get('/api/images').expect(400);
  });
  it('should return an error when passing no height paramter', async () => {
    await request
      .get('/api/images?fileName=icelandwaterfall&width=300&height=')
      .expect(400);
  });
  it('should return an error when passing no width paramter', async () => {
    await request
      .get('/api/images?fileName=icelandwaterfall&width=&height=300')
      .expect(400);
  });
  it('should return an error when passing a not existed fileName', async () => {
    await request
      .get('/api/images?fileName=newImage&width=200&height=300')
      .expect(404);
  });
  it('should return ok when resizing an existed image with valid parameters', async () => {
    await request
      .get('/api/images?fileName=icelandwaterfall&width=200&height=300')
      .expect(200);
  });
});

describe('Testing image processing functionality', () => {
  it('should perform image resize process without throwing errors', () => {
    expect(() => {
      imageResize(imagePath, testWidth, testHeight);
    }).not.toThrow();
  });
});
