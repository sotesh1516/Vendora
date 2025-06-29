import axios from "axios";

export const updateMyBooking = async (bookingInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mylisting/update', {
            userId: bookingInfo.userId,
            bookingId: bookingInfo.bookingId,
        });
    
        if (response.status == 200) {
            return response.data;
        }
        console.error("An error has occured during my booking update", result.status);
        return {error: "an error has occured during my booking update"};
    } catch (error) {
        console.error("Error during the my booking update");
        return {error: "My bookinh update failed. PLease try again"};
    }
   
};

