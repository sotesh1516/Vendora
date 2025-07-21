const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "diviwfc2b",
  api_key: "272231238346854",
  api_secret: "Q7PQfU-5jg3-JGdtW_O75Jsqttg", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
