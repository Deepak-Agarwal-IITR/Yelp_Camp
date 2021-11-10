const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'6178f62acdaaa224f724427f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '   Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dicta at odit exercitationem harum quia, magnam non vel adipisci aliquam quam minima sequi iure ea molestiae vero! Deleniti, fugiat hic?',
            price,
            images:  [
                {
                    url: 'https://res.cloudinary.com/deepakagarwal/image/upload/v1636527431/YelpCamp/saqe7hipdcranvec8ich.jpg',
                    filename: 'YelpCamp/saqe7hipdcranvec8ich'
                },
                {
                    url: 'https://res.cloudinary.com/deepakagarwal/image/upload/v1636527431/YelpCamp/xibvxag9qjb0x65hpbte.jpg',
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