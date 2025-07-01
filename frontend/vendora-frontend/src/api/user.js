import axios from "axios";

export const updateUserBooking = async (bookingInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mybooking/update', {
            userId: bookingInfo.userId,
            bookingId: bookingInfo.bookingId,
        });
    
        if (response.status == 200) {
            return response.data;
        }
        console.error("An error has occured during my booking update", response.status);
        return {error: "an error has occured during my booking update"};
    } catch (error) {
        console.error("Error during my booking update");
        return {error: "My bookinh update failed. Please try again"};
    }
   
};

export const fetchUserBookings = async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mybookings/fetch', {
            userId: userInfo.userId,
        });

        if (response.status == 200)
        {
            console.log("My booking successfully fetched", response.data);
            return response.data;
        }

        console.error("An error has occured during my booking fetch", response.status);
        return {error: "an error has occured during my booking fetch"};
    } catch (error) {
        console.error("Error during my booking fetch");
        return {error: "My booking fetch failed. Please try again"};
    }
}

