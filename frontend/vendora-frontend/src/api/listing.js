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
  multiPartStructuredUserData.append("serivceName", newListing.service);
  newListing.serviceOpts.forEach((opt) => {
    multiPartStructuredUserData.append("serviceOptions", opt);
  });
  newListing.timeSlotsAv.forEach((slot) => {
    multiPartStructuredUserData.append("timeSlots", slot);
  });
  multiPartStructuredUserData.append("ratePerHr", newListing.price);
  //JSON.stringify is used to avoid the conversion of [] => ""
  //On the backend it is required to do const ratings = JSON.parse(req.body.ratings);
  multiPartStructuredUserData.append("ratings", JSON.stringify([]));
  multiPartStructuredUserData.append("description", newListing.description);
  newListing.selectedImages.forEach((file) => {
    multiPartStructuredUserData.append("images", file);
  });

  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/api/listing/create",
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
    const response = await axios.post(
      "http://127.0.0.1:8000/api/listing/fetch",
      {
        userId: userInfo.userId,
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
      `http://127.0.0.1:8000/api/listing/search?query=${encodeURIComponent(
        query
      )}`
    );

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error during the listing retrieval process");
    return {
      error: error,
      message: "Listing retrieval failed. PLease try again",
    };
  }
};
