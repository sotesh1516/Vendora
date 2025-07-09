const Booking = require("../models/booking.model");
const User = require("../models/user.model");

const updateUserBookingList = async (req, res) => {
  try {
    const updatedInformation = req.body;
    const existingUserQuery = await User.findByIdAndUpdate(
      updatedInformation.userId,
      {
        $push: { myBookings: updatedInformation.bookingId },
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
}

const updateUserListingList = async (req, res) => {
  try {
    const updatedInformation = req.body;
    const existingUserQuery = await User.findByIdAndUpdate(
      updatedInformation.userId,
      {
        $push: { myListings: updatedInformation.listingId }
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

module.exports = { updateUserBookingList, fetchUserBookingList, updateUserListingList };
