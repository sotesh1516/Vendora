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

    if (!existingUser) {
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

const updateUserListingList = async (req, res) => {
  try {
    const updatedInformation = req.body;
    const existingUserQuery = User.findByIdAndUpdate(
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

module.exports = { updateUserBookingList, updateUserListingList };
