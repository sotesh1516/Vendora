import axios from "axios";

export const updateUserBooking = async (bookingUpdateInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mybooking/update', {
            userId: bookingUpdateInfo.userId,
            bookingId: bookingUpdateInfo.bookingId,
        });
    
        if (response.status == 200) {
            return response.data;
        }
        console.error("An error has occured during my booking update", response.status);
        return {error: "an error has occured during my booking update"};
    } catch (error) {
        console.error("Error during my booking update");
        return {error: "My booking update failed. Please try again"};
    }
   
};

export const fetchUserBookings = async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mybookings/fetch', {
            userId: userInfo.userId,
        });

        if (response.status == 200)
        {
            //console.log("My booking successfully fetched", response.status);
            return response.data;
        }

        console.error("An error has occured during my booking fetch", response.status);
        return {error: "an error has occured during my booking fetch"};
    } catch (error) {
        console.error("Error during my booking fetch");
        return {error: "My booking fetch failed. Please try again"};
    }
}

export const updateUserListing = async (listingUpdateInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mylisting/update', {
            userId: listingUpdateInfo.userId,
            listingId: listingUpdateInfo.listingId
        });

        if (response.status == 200) {
            return response.data;
        }
        console.error("An error has occured during my listing update", response.status);
        return {error: "an error has occured during my listing update"};
    } catch (error) {
        console.error("Error during my listing update");
        return {error: "My listing update failed. Please try again"};
    }
};

export const fetchUserListings = async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/mylistings/fetch', {
            userId: userInfo.userId,
        });

        if (response.status == 200)
        {
            //console.log("My booking successfully fetched", response.status);
            //console.log(response.data);
            return response.data;
        }

        console.error("An error has occured during my booking fetch", response.status);
        return {error: "an error has occured during my booking fetch"};
    } catch (error) {
        console.error("Error during my booking fetch");
        return {error: "My booking fetch failed. Please try again"};
    }
};

export const fetchUserFavorites = async () => {

};

export const updateUserFavorites = async (favoriteUpdateInfo) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/user/myfavorite/update", {
            userId: favoriteUpdateInfo.userId,
            listingId: favoriteUpdateInfo.listingId,
        });

        if (response.status == 200)
        {
            console.log(response.data);
            return response.data;
        }
        console.error("An error has occured during my favorite update", response.status);
        return {error: "an error has occured during my favorite update"};
    } catch (error) {
        console.error("Error during my favorite update");
        return {error: "My favorite update failed. Please try again"};
    }
};

