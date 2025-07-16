const Booking = require("../models/booking.model");
const User = require("../models/user.model");

const updateUserBookingList = async (req, res) => {
  try {
    const updateInformation = req.body;
    const existingUserQuery = await User.findByIdAndUpdate(
      updateInformation.userId,
      {
        $push: { myBookings: updateInformation.bookingId },
      },
      { new: true }
    ).exec();

    if (!existingUserQuery) {
      return res.status(401).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({
        updatedUser: existingUserQuery,
        message: "My booking list has been updated successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during mybooking update" });
  }
};

//finds a user document by the provided id
//populates the "myBookings" attribute by using the stored objectid into an actual object/document
const fetchUserBookingList = async (req, res) => {
  try {
    const fetchInformation = req.body;
    const userWithBooking = await User.findById(fetchInformation.userId).populate('myBookings').exec();

    if (!userWithBooking)
    {
      return res.status(401).json({error: "User not found"});
    }

    const userBookings = userWithBooking.myBookings;

    await Booking.populate(userBookings, {path: "listingId"});

    return res.status(200).json({
      user: userWithBooking,
      message: "User with the booking list has been successfully fetched",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during mybooking update" });
  }
};

const updateUserListingList = async (req, res) => {
  try {
    const updateInformation = req.body;
    const existingUserQuery = await User.findByIdAndUpdate(
      updateInformation.userId,
      {
        $push: { myListings: updateInformation.listingId }
      }, {new: true}
    ).exec();

    if (!existingUserQuery)
    {
        return res.status(401).json({error: "User with the given credential has not been found"});
    }

    return res.status(200).json({updatedUser: existingUserQuery, message: "My listing array has been updated successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during mylisting update" });
  }
};

const fetchUserListingList = async (req, res) => {
  try {
    const fetchInformation = req.body;
    const userWithListing = await User.findById(fetchInformation.userId).populate('myListings').exec();

    if (!userWithListing)
    {
      return res.status(401).json({error: "User not found"});
    }

    //const userListings = userWithListings.myListings;
    //await Booking.populate(userBookings, {path: "listingId"});

    return res.status(200).json({
      user: userWithListing,
      message: "User with the listing list has been successfully fetched",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during mybooking update" });
  }
};


const updateUserFavoriteList = async (req, res) => {
  try {
    const updateInformation = req.body;

    const listingFavoriteStatusCheck = await User.findById(updateInformation.userId).populate('myFavorites');

    if (!listingFavoriteStatusCheck)
    {
      return res.status(401).json({error: "User not found"});
    }

    const matchFound = listingFavoriteStatusCheck.myFavorites.map((myFavorite) => updateInformation.listingId === myFavorite._id.toString());

    let existingUserQuery = null;

    if (matchFound) {
      existingUserQuery = await User.findByIdAndUpdate(updateInformation.userId, {$pull: {myFavorites: updateInformation.listingId}}, {new:true});
    }

    else {
      existingUserQuery = await User.findByIdAndUpdate(updateInformation.userId, {$push: {myFavorites: updateInformation.listingId}}, {new:true});
    }

    
    if (!existingUserQuery) {
      return res.status(401).json({error: "error during favorite list update (pop/push)"});
    }

    return res.status(200).json({
      updatedUser: existingUserQuery,
      message: "My favorite list has been updated successfully",
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during myfavorite update" });
  }
  

};

const fetchUserFavoriteList = async (req, res) => {
  try {
    const fetchInformation = req.body;
    const userWithFavorite = User.findById(fetchInformation).populate('myFavorite').exec();

    if (!userWithFavorite)
    {
      res.status(401).json({error: "User not found"});
    }

    res.status(200).json({
      user: userWithListing,
      message: "User with the favorite list has been successfully fetched",
    });

  } catch (error) {
    
  }
}

module.exports = { updateUserBookingList, fetchUserBookingList, updateUserListingList, fetchUserListingList, updateUserFavoriteList, fetchUserFavoriteList };
