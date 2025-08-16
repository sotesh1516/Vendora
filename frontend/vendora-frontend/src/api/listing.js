import axios from "axios";

//By default, Node/Express don't magically know how to handle raw files
//If you try to send a raw file object without any encoding, the browser doesn't knwo what ccontent type
//to use, and express wouldn't know how to separate it from other form fields like name, email
//So HTTP instroduces multipart/form-data -> Binary file data + Text fields
// FormData build a properly structured multipart/form-data to send to the backend
// NOTE: The backend will automatically detect files and non-files, req.body and req.files
export const registerListing = async (newListing) => {
  const multiPartStructuredUserData = new FormData();

  multiPartStructuredUserData.append("serviceProvider", newListing.name);
  multiPartStructuredUserData.append("serviceName", newListing.service);
  newListing.serviceOpts.forEach((opt) => {
    multiPartStructuredUserData.append("serviceOptions", opt);
  });
  newListing.timeSlotsAv.forEach((slot) => {
    multiPartStructuredUserData.append("timeSlots", slot);
  });
  // multiPartStructuredUserData.append(
  //   "serviceOptions",
  //   JSON.stringify(newListing.serviceOpts)
  // );
  // multiPartStructuredUserData.append(
  //   "timeSlots",
  //   JSON.stringify(newListing.timeSlotsAv)
  // );
  multiPartStructuredUserData.append("ratePerHr", newListing.price);
  //JSON.stringify is used to avoid the conversion of [] => ""
  //On the backend it is required to do const ratings = JSON.parse(req.body.ratings);
  multiPartStructuredUserData.append("ratings", JSON.stringify([]));
  multiPartStructuredUserData.append("cloudStoredImages", JSON.stringify([])); //might not need this
  multiPartStructuredUserData.append("description", newListing.description);
  newListing.images.forEach((file) => {
    multiPartStructuredUserData.append("images", file);
  });

  for (let [key, value] of multiPartStructuredUserData.entries()) {
    console.log(key, value);
  }

  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/api/listings/",
      multiPartStructuredUserData
    );

    if (result.status == 200) {
      console.log("Listing has been successfully registered:", result.data);
      return result.data;
    } else {
      console.error("An error has occured", result.status);
      return { error: "an error has occured" };
    }
  } catch (error) {
    console.error("Error during the listing creation process");
    return {
      error: error,
      message: "Listing creation failed. PLease try again",
    };
  }
};

export const retrieveListings = async (userInfo) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/listings/",
      {
        params: { pageNumber: userInfo.pageNumber},
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}` 
        }
      }
    );

    if (response.status == 200) {
      console.log("Listings have been successfully retrieved:", response.data);
      return response.data;
    } else {
      console.error("An error has occured", response.status);
      return { error: "an error has occured" };
    }
  } catch (error) {
    console.error("Error during the listing retrieval process");
    return {
      error: error,
      message: "Listing retrieval failed. PLease try again",
    };
  }
};

//encodeURIComponent is being used to avoid url breaking
//Example:
//"lap top" → "lap%20top"
export const searchListings = async (query) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/listings/search?query=${encodeURIComponent(
        query
      )}`
    );

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error during the listing(s) retrieval process");
    return {
      error: error,
      message: "Listing(s) retrieval failed. PLease try again",
    };
  }
};

export const fetchListing = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/listings/${id}`);

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      // Not found
      return {
        error: true,
        message: "Listing not found.",
      };
    } else if (response.status === 401) {
      // Unauthorized
      return {
        error: true,
        message: "Unauthorized. Please log in again.",
      };
    } else if (response.status === 500) {
      // Server error
      return {
        error: true,
        message: "Server error. Please try again later.",
      };
    } else {
      // All other non-200 statuses
      return {
        error: true,
        message: `Unexpected error: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error during the listing retrieval process");
    return {
      error: error,
      message: "Listing retrieval failed. PLease try again",
    };
  }
};

export const editListing = async (updateInfo) => {
  try {
    console.log(updateInfo);
    const response = await axios.put(
      `http://127.0.0.1:8000/api/listing/${updateInfo.id}`,
      updateInfo.updatedListing
    );

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      // Not found
      return {
        error: true,
        message: "Listing not found.",
      };
    } else if (response.status === 401) {
      // Unauthorized
      return {
        error: true,
        message: "Unauthorized. Please log in again.",
      };
    } else if (response.status === 500) {
      // Server error
      return {
        error: true,
        message: "Server error. Please try again later.",
      };
    } else {
      // All other non-200 statuses
      return {
        error: true,
        message: `Unexpected error: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error during the listing retrieval process");
    return {
      error: error,
      message: "Listing retrieval failed. PLease try again",
    };
  }
};
