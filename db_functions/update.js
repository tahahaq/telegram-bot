var exports = module.exports = {},
    foodFeaturedModel = require('../../models/Food/foodFeatured'),
    hangoutModel = require("../../models/hangout/hangout"),
    constants = require('../../misceallenous/constants'),
    bcrypt = require('bcrypt'),
    userReviewModel = require('../../models/user/review'),
    placesPortal = require('../../models/RestaurantPortal/login'),
    foodFeaturedDetailModel = require("../../models/Food/foodFeaturedDetail");


exports.updateHangoutPlace = async (placeId, placeData) => {
    try {
        let hangoutData = await hangoutModel.findByIdAndUpdate(placeId, placeData);
        return hangoutData.name;
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.updatePlacePortalPassword = async (placeId , place) => {
     try {
         let hashOfPassword = await bcrypt.hash(place.password, constants.SALT);
         return await placesPortal.findByIdAndUpdate(placeId, {password: hashOfPassword});
     } catch (e) {

     }
};


exports.updateFeaturedPlaceReview = async (placeId, reviewData) => {
    try {
         await userReviewModel.findByIdAndUpdate(placeId,reviewData);
        return constants.responseMessages.Success
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.updateFeaturedPlace = async (placeId, placeData) => {
    try {
        let featuredShortData = await foodFeaturedModel.findByIdAndUpdate(placeId, placeData);
        await foodFeaturedDetailModel.findByIdAndUpdate(featuredShortData.featured_detail_id, placeData);
        return featuredShortData.name
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


