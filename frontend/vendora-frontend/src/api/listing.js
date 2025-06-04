import axios from "axios"

export const registerListing = async (newListing) => {
  try {
    const result = await axios.post("http://127.0.0.1:8000/api/listing/create", {
      serviceProvider: newListing.name,
      serviceName: newListing.service,
      ratePerHr: newListing.price,
      ratings: [],
      description: newListing.description,
    });
  
    if (result.status == 200) {
      console.log("Listings has been successfully registered:", result.data);
      return result.data;
    } else {
      console.error("An error has occured", result.status);
      return { error: "an error has occured" };
    }
  } catch (error) {
    console.error("Error during the listing creation process");
        return {error: "Listing creation failed. PLease try again"};
  }
  
  
};
