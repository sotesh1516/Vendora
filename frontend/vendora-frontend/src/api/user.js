import axios from "axios";

const updateMyBooking = async (bookingInfo) => {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', {
        userId: bookingInfo.userId,
        bookingId: bookingInfo.bookingId,
    });

    if (response.status == 200) {
        
    }
}