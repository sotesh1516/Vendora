import axios from "axios";

export const bookListing = async (newBooking) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/bookings/",
      {
        listingId: newBooking.listingId,
        customerId: newBooking.customerId,
        customerSummary: newBooking.customerSummary,
        timeSlot: newBooking.timeSlot,
        status: newBooking.status,
      }, {
        headers: {
          Authorization: `Bearer ${newBooking.accessToken}`,
        }
      }
    );

    if (response.status == 200) {
        console.log("You have successfully booked the listing", response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
