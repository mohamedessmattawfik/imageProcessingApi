[![Actions Status](https://github.com/mohamedessmattawfik/imageProcessingApi/workflows/Lint%20and%20Test/badge.svg)](https://github.com/mohamedessmattawfik/imageProcessingApi/actions)

# Image Processing Api



## This is the first project of the Advanced web development nano degree offered by udacity . 
 The project goal is to make an api with `express` `node.js` which handles image resizing for a specified image using [`sharp`](https://www.npmjs.com/package/sharp) package which offers alot of image processing operations . 


 The api simply handles one endpoint which is `/images` and the image file name and the desired new height and width is provided with the query parameters of the url . 

In order to improve the performance i used cache memory to avoid proocessing the same image for the same request every time . to achieve this i used [`node-cache`](https://www.npmjs.com/package/node-cache) package .

to run the project just clone the repo and in the root dir of the project run : 
  ```bash
    npm start
  ```
  
  also i have made some tests to test the functionality of the endpoint using [`jasmine`](https://www.npmjs.com/package/jasmine) and [`supertest`](https://www.npmjs.com/package/supertest) packages. you can run the tests by running : 
  
  ```bash
    npm run test
  ```
   You can find the video below a short run for the project : 

https://user-images.githubusercontent.com/48156488/189197452-826bf337-b720-4577-9096-e2701bf28c84.mov

