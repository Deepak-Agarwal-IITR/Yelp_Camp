const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//const Joi = require('joi');
const { campgroundSchema } = require('./schemas.js');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
})

const validateCampground = (req,res,next)=>{
    
    const { error } = campgroundSchema.validate(req.body);
    //console.log(error.details);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        //console.log(msg)
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/campgrounds', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})
app.post('/campgrounds', validateCampground ,catchAsync(async (req, res, next) => {
    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    
    const campground = new Campground(req.body.campground);
    //console.log(campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))
app.get('/campgrounds/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
}))
app.get('/campgrounds/:id/edit', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}))
app.put('/campgrounds/:id', validateCampground ,catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // console.log(req.body);
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`)
}))
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong';
    res.status(statusCode).render('error',{err});
    //res.send("Oops,Something went wrong");
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})