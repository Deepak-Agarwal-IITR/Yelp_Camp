const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const User = require("../models/user")

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});

    const user1 = new User({ username:"Test",email:"test@gmail.com"});
    const registeredUser1 = await User.register(user1, "test");

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: registeredUser1._id,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '   Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dicta at odit exercitationem harum quia, magnam non vel adipisci aliquam quam minima sequi iure ea molestiae vero! Deleniti, fugiat hic?',
            price,
            geometry:{
                type : "Point",
                coordinates : [ cities[random1000].longitude,cities[random1000].latitude ]
            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/deepakagarwal/image/upload/v1636021650/samples/landscapes/nature-mountains.jpg',
                    filename: 'YelpCamp/saqe7hipdcranvec8ich'
                },
                {
                    url: 'https://res.cloudinary.com/deepakagarwal/image/upload/v1636021646/samples/landscapes/beach-boat.jpg',
                    filename: 'YelpCamp/xibvxag9qjb0x65hpbte'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})