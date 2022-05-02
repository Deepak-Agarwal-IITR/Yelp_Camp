# YelpCamp
A responsive web application "Yelp Camp" for the people who love camping around the world. It will allow users to show their camps in the application. Users can visit the camp by seeing the images of the camp provided by the owner and based on reviews from other users who visited. <br /> 
## Features
➢ A web application to show the camps made in different parts of world.<br />
➢ Feature like Multiple Camp Images <br />
➢ Users can give their Reviews on Camps <br />
➢ The location of the camp is shown in the world map.<br />
➢ Build Using NodeJS, ExpressJS, MongoDB, Mongoose, Cloudinary <br />

## SetUp Instructions
To start the application: You should have Node, MongoDB, Terminal on your device. <br />

Make a ".env" file in the root directory and paste the following lines: <br />
To use image upload: <br />
```
CLOUDINARY_CLOUD_NAME= <YOUR_CLOUD_NAME>  
CLOUDINARY_KEY=<YOUR_API_KEY>  
CLOUDINARY_SECRET=<YOUR_CLOUDINARY_SECRET> 
```
To use map: <br />
```
MAPBOX_TOKEN=<YOUR_MAPBOX_TOKEN> 
```
Open MongoDB. <br />
Open the terminal and run,<br /> <br />
```
npm install
node seeds/    // This will delete the data in database if exists and will create 200 campgrounds and a test user.
```
NOTE: Please do not edit or delete the new campgrounds beacuse all are sharing a single image links and can break the things.It is only for testing purposes.
node app.js  <br />

Open localhost:3000 in your browser.  <br />
