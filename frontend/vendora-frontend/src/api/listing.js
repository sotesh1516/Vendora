const axios = require("axios");

const registerListing = async (newListing) => {
  const result = await axios.post("http://127.0.0.1:8000/listing/create", {
    serviceProvide: newListing.
    serviceName: 
  });

  if (result.status == 200) {
    console.log("Listings has been successfully registered:", result.data);
    return result.data;
  } else {
    console.error("An error has occured", result.status);
    return { error: "an error has occured" };
  }
};
