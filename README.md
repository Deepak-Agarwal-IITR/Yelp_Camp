➢ A web application to show the camps made in different parts of world. 
➢ Feature like Multiple Camp Images 
➢ Users can give their Reviews on Camps 
➢ The location of the camp is shown in the world map.
➢ Build Using NodeJS, ExpressJS, MongoDB, Mongoose, Cloudinary

To start the application: You should have Node, MongoDB, Terminal on your device.

Make a ".env" file in the root directory and paste the following lines:
To use image upload:
CLOUDINARY_CLOUD_NAME= <YOUR_CLOUD_NAME> 
CLOUDINARY_KEY=<YOUR_API_KEY> 
CLOUDINARY_SECRET=<YOUR_CLOUDINARY_SECRET>

To use map:
MAPBOX_TOKEN=<YOUR_MAPBOX_TOKEN>

Open MongoDB. 
Open the terminal and run,

npm install
node seeds/ // This will delete the data in database if exists and will create 200 campgrounds and a test user. 
NOTE: Please do not edit or delete the new campgrounds beacuse all are sharing a single image links and can break the things.It is only for testing purposes.
node app.js

Open localhost:3000 in your browser.
