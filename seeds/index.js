const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
//const axios = require("axios/dist/node/axios.cjs");
const axios = require("axios");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => {
    console.log("DB CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERROR");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const getImage = async () => {
  try {
    const res = await axios.get(
      "https://api.unsplash.com/photos/random?collections=483251&client_id=WMtRVyDhaCU4x_77zq_fPq_T-HK5x-DA7D8NEhOGHnc&count=1"
    );
    return res.body.urls.regular;
  } catch (e) {
    console.log("ERROR :", e);
  }
};
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/random/900×700/?camp",
      description:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et illum error dolores consequuntur ea! Non aliquam ipsam eius aliquid fugiat quisquam consequatur veniam tempora totam, provident perferendis minima! Sint, vel.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
