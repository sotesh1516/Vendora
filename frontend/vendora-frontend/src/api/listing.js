import axios from "axios";

export const registerListing = async (newListing) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/api/listing/create",
      {
        serviceProvider: newListing.name,
        serviceName: newListing.service,
        serviceOptions: newListing.serviceOpts,
        timeSlots: newListing.timeSlotsAv,
        ratePerHr: newListing.price,
        ratings: [],
        description: newListing.description,
      }
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

export const searchListings = async (query) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/listing?query=${query}`);

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
