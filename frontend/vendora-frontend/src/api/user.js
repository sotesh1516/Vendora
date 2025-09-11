import axios from "axios";

// What happens when you don't do the config below:
// 1. Browser makes request to backend
// 2. Browser says: "This is cross-origin, I won't send cookies for security"
// 3. Your refreshToken cookie stays in the browser, NOT sent to server
// 4. Server receives request with NO cookies
// 5. Server: "No refresh token found" → 401 Unauthorized
axios.defaults.withCredentials = true; // this can be done per request too

export const fetchUserInfo = async (userInfo) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/user/me", 
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("User info successfully fetched", response.status);
      return response.data;
    }

    console.error(
      "An error has occurred during user info fetch",
      response.status
    );
    return { error: "An error has occurred during user info fetch" };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("User not authenticated - 401 error");
      return {
        error: "Please sign in to access user information",
        code: 401,
        requiresAuth: true,
      };
    }

    if (error.response && error.response.status === 404) {
      console.error("User not found - 404 error");
      return {
        error: "User not found",
        code: 404,
      };
    }

    console.error("Error during user info fetch", error);
    return { error: "User info fetch failed. Please try again" };
  }
};

export const updateUserBooking = async (bookingUpdateInfo) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/user/mybookings/${bookingUpdateInfo.bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${bookingUpdateInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      return response.data;
    }
    console.error(
      "An error has occured during my booking update",
      response.status
    );
    return { error: "an error has occured during my booking update" };
  } catch (error) {
    console.error("Error during my booking update");
    return { error: "My booking update failed. Please try again" };
  }
};

export const fetchUserBookings = async (userInfo) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/user/mybookings/",
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      //console.log("My booking successfully fetched", response.status);
      return response.data;
    }

    console.error(
      "An error has occured during my booking fetch",
      response.status
    );
    return { error: "an error has occured during my booking fetch" };
  } catch (error) {
    console.error("Error during my booking fetch");
    return { error: "My booking fetch failed. Please try again" };
  }
};

export const updateUserListingList = async (listingUpdateInfo) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/user/mylistings/${listingUpdateInfo.listingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${listingUpdateInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      return response.data;
    }
    console.error(
      "An error has occured during my listing update",
      response.status
    );
    return { error: "an error has occured during my listing update" };
  } catch (error) {
    console.error("Error during my listing update");
    return { error: "My listing update failed. Please try again" };
  }
};

export const fetchUserListings = async (userInfo) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/user/mylistings/", // remove fetch
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      //console.log("My booking successfully fetched", response.status);
      //console.log(response.data);
      return response.data;
    }

    console.error(
      "An error has occured during my booking fetch",
      response.status
    );
    return { error: "an error has occured during my booking fetch" };
  } catch (error) {
    console.error("Error during my booking fetch");
    return { error: "My booking fetch failed. Please try again" };
  }
};

export const fetchUserFavorites = async (userInfo) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/myfavorites/`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    }
    console.error(
      "Server responded with an error during my favorites fetch",
      response.status
    );
    return { error: "Server responded with an error my favorites fetch" };
  } catch (error) {
    console.error("Error during my favorites fetch");
    return { error: "My favorites fetch failed. Please try again" };
  }
};

export const updateUserFavorites = async (favoriteUpdateInfo) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/user/favorites/${favoriteUpdateInfo.listingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${favoriteUpdateInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    }
    console.error(
      "Server responded with an error during my favorite update",
      response.status
    );
    return { error: "Server responded with an error my favorite update" };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("User not authenticated - 401 error");
      return {
        error: "Please sign in to add favorites",
        code: 401,
        requiresAuth: true,
      };
    }

    console.error("Error during my favorite update");
    return { error: "My favorite update failed. Please try again" };
  }
};

export const registerCashApp = async (userInfo) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/paymentinfo/cashapp/${userInfo.id}`
    );

    if (response.status == 200) {
      return response.data;
    }

    console.error(
      "Server responded with an error cash app handle update",
      response.status
    );
    return { error: "Server responded with an error cash app handle update" };
  } catch (error) {
    console.error("Error during cash app handle update");
    return { error: "Cash app handle update failed. Please try again" };
  }
};

export const checkUserBookingStatusForListing = async (fetchInfo) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/bookings/check/listing/${fetchInfo.listingId}`,
      {
        headers: {
          Authorization: `Bearer ${fetchInfo.accessToken}`,
        },
      }
    );

    if (response.status == 200) {
      return response.data;
    }

    console.error(
      "Server responded with an error during user booking status check for a listing",
      response.status
    );
    return {
      error:
        "Server responded with an error during user booking status check for a listing",
    };
  } catch (error) {
    console.error("Error during user booking status check for a listing");
    return {
      error:
        "during user booking status check for a listing failed. Please try again",
    };
  }
};

export const fetchBookingsBasedOnAListing = async (fetchInfo) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/listings/${fetchInfo.id}/bookings`,
      {
        headers: {
          Authorization: `Bearer ${fetchInfo.accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    console.error(
      "Server responded with an error during bookings fetch for listing",
      response.status
    );
    return {
      error: "Server responded with an error during bookings fetch for listing",
    };
  } catch (error) {
    console.error("Error during bookings fetch for listing:", error);
    return {
      error: "Fetching bookings for listing failed. Please try again",
    };
  }
};


