const Booking = require("../models/booking.model");
const User = require("../models/user.model");

const fetchUserInfo = async (req, res) => {
  try {
    const verifiedUser = req.user; // Comes from your authorization middleware

    // Optional: Get full user data from database if you need more fields
    const user = await User.findById(verifiedUser.id).select('-password').exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        // Add any other safe user fields you want to return
        createdAt: user.createdAt,
        // Don't include sensitive fields like password
      },
      message: "User info fetched successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      error: "Internal server error during user info fetch" 
    });
  }
};

const updateUserBookingList = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    console.log(bookingId);
    const verifiedUser = req.user;
    const existingUserQuery = await User.findByIdAndUpdate(
      verifiedUser.id,
      {
        $push: { myBookings: bookingId },
      },
      { new: true }
    ).exec();

    if (!existingUserQuery) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json({
      updatedUser: existingUserQuery,
      message: "My booking list has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during mybooking update" });
  }
};

//finds a user document by the provided id
//populates the "myBookings" attribute by using the stored objectid into an actual object/document
const fetchUserBookingList = async (req, res) => {
  try {
    const verifiedUser = req.user;
    const userWithBooking = await User.findById(verifiedUser.id)
      .populate("myBookings")
      .exec();

    if (!userWithBooking) {
      return res.status(401).json({ error: "User not found" });
    }

    const userBookings = userWithBooking.myBookings;

    await Booking.populate(userBookings, { path: "listingId" });

    return res.status(200).json({
      user: userWithBooking,
      message: "User with the booking list has been successfully fetched",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during mybooking update" });
  }
};

const updateUserListingList = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const verifiedUser = req.user;
    const existingUserQuery = await User.findByIdAndUpdate(
      verifiedUser.id,
      {
        $push: { myListings: listingId },
      },
      { new: true }
    ).exec();

    if (!existingUserQuery) {
      return res
        .status(401)
        .json({ error: "User with the given credential has not been found" });
    }

    return res.status(200).json({
      updatedUser: existingUserQuery,
      message: "My listing array has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during mylisting update" });
  }
};

const fetchUserListingList = async (req, res) => {
  try {
    const verifiedUser = req.user;
    const userWithListing = await User.findById(verifiedUser.id)
      .populate("myListings")
      .exec();

    if (!userWithListing) {
      return res.status(401).json({ error: "User not found" });
    }

    //const userListings = userWithListings.myListings;
    //await Booking.populate(userBookings, {path: "listingId"});

    return res.status(200).json({
      user: userWithListing,
      message: "User with the listing list has been successfully fetched",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during mybooking update" });
  }
};

const updateUserFavoriteList = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const verifiedUser = req.user;
    const listingFavoriteStatusCheck = await User.findById(
      verifiedUser.id
    ).populate("myFavorites");

    if (!listingFavoriteStatusCheck) {
      return res.status(401).json({ error: "User not found" });
    }

    let matchFound = false;

    listingFavoriteStatusCheck.myFavorites.forEach((myFavorite) => {
      if (listingId === myFavorite._id.toString()) {
        matchFound = true;
        return;
      }
    });

    let existingUserQuery = null;

    if (matchFound) {
      existingUserQuery = await User.findByIdAndUpdate(
        verifiedUser.id,
        { $pull: { myFavorites: listingId } },
        { new: true }
      );
    } else {
      existingUserQuery = await User.findByIdAndUpdate(
        verifiedUser.id,
        { $push: { myFavorites: listingId } },
        { new: true }
      );
    }

    if (!existingUserQuery) {
      return res
        .status(401)
        .json({ error: "error during favorite list update (pop/push)" });
    }

    return res.status(200).json({
      updatedUser: existingUserQuery,
      message: "My favorite list has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during myfavorite update" });
  }
};

const fetchUserFavoriteList = async (req, res) => {
  try {
    const verifiedUser = req.user;
    const userWithFavorite = await User.findById(verifiedUser.id)
      .populate("myFavorites")
      .exec();

    if (!userWithFavorite) {
      res.status(401).json({ error: "User not found" });
    }

    res.status(200).json({
      user: userWithFavorite,
      message: "User with the favorite list has been successfully fetched",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during myfavorite fetch" });
  }
};

const registerUserCashAppHandle = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateInfo = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cashAppHandle: updateInfo },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({
      updatedUser: updatedUser,
      message: "User's cash app handle has been successfully updated",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during cash app handle update" });
  }
};

const fetchUserCashAppHandle = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("cashAppHandle").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      cashAppHandle: user.cashAppHandle,
      message: "Successfully fetched Cash App handle",
    });
  } catch (error) {
    console.error("Error fetching Cash App handle:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching Cash App handle" });
  }
};

const registerUserVenmoHandle = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateInfo = req.body; // should contain the Venmo handle string

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { venmoHandle: updateInfo },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      updatedUser,
      message: "User's Venmo handle has been successfully updated",
    });
  } catch (error) {
    console.error("Error updating Venmo handle:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during Venmo handle update" });
  }
};

const fetchUserVenmoHandle = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("venmoHandle").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      venmoHandle: user.venmoHandle,
      message: "Successfully fetched Venmo handle",
    });
  } catch (error) {
    console.error("Error fetching Venmo handle:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching Venmo handle" });
  }
};

const checkUserBookingForListing = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const verifiedUser = req.user;

    if (!listingId) {
      return res.status(400).json({ error: "Missing listing_id in query" });
    }

    const foundUser = await User.findById(verifiedUser.id).populate("myBookings");

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let matchFound = false;
  
    foundUser.myBookings.forEach((booking) => {
      //console.log(booking.listingId.toString())
      if (booking.listingId.equals(listingId)) {
        matchFound = true;
      }

    });
    return res.status(200).json({ booked: matchFound });

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error while checking listing's status" });
  }
};

module.exports = {
  updateUserBookingList,
  fetchUserBookingList,
  updateUserListingList,
  fetchUserListingList,
  updateUserFavoriteList,
  fetchUserFavoriteList,
  registerUserCashAppHandle,
  fetchUserCashAppHandle,
  registerUserVenmoHandle,
  fetchUserVenmoHandle,
  checkUserBookingForListing,
  fetchUserInfo
};
