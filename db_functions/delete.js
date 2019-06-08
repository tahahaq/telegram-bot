var exports = module.exports = {},
    foodFeaturedModel = require('../../models/Food/foodFeatured'),
    hangoutModel = require("../../models/hangout/hangout"),
    userReviewModel = require('../../models/user/review'),
    constants = require('../../misceallenous/constants'),
    foodFeaturedDetailModel = require("../../models/Food/foodFeaturedDetail");


exports.deleteHangoutPlace = async (placeId) => {
    try {
        let hangoutPlace = await  hangoutModel.findByIdAndRemove(placeId);
        return hangoutPlace.name
    }  catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.deleteFeaturedPlaceUserReview= async (reviewId) => {
    try {
        await  userReviewModel.findByIdAndRemove(reviewId);
        return constants.responseMessages.Success
    }  catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.deleteFeaturedPlace = async (placeId) => {
    try {
       let featuredShortData = await  foodFeaturedModel.findByIdAndRemove(placeId);
        await  foodFeaturedDetailModel.findByIdAndRemove(featuredShortData.featured_detail_id);
        return featuredShortData.name
    }  catch (e) {
        console.log(e);
        throw new Error(e)
    }
};
