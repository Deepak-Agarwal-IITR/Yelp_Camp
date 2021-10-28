const express = require('express');
const router = express.Router({ mergeParams: true });

const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utils/catchAsync');
//const ExpressError = require('../utils/ExpressError');
//const { reviewSchema } = require('../schemas.js');
const { validateReview } = require('../middleware');

router.post('/', validateReview, catchAsync(async (req, res) => {
    // Now the id is in app.js so here we can not acces it without MERGEPARAMS = TRUE in router;
    //console.log(req.params);
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success','Created new review!')
    res.redirect(`/campgrounds/${camp._id}`)
}))
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
    //res.send("Deleted")
}))
module.exports = router;