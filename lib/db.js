// Import necessary modules
const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const ImageKit = require('imagekit')
const axios = require('axios')
let BUNNY_STREAM_LIBRARY_ID=process.env.BUNNY_STREAM_LIBRARY_ID;
let BUNNY_STREAM_API_KEY=process.env.BUNNY_STREAM_API_KEY;
// MongoDB connection URL from environment variables
const url = process.env.URL;

// Connect to MongoDB using mongoose
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 10000,
    j: true
  },
}).then(() => console.info("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error))

// Create a new connection to MongoDB
const conn = mongoose.createConnection(url);

// Initialize ImageKit with credentials from environment variables
/*const imageKit = new ImageKit({
  publicKey: "public_pCO1m90+kahF2FgOpDEwO4gLtu0=",
 privateKey: "private_Xu8ot3iBeFqdOUCo2/nKdP1fqVs=",
  urlEndpoint: "https://ik.imagekit.io/h6gkz4psd",
});*/
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET,
});


// BunnyCDN endpoint for video streaming
const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${BUNNY_STREAM_LIBRARY_ID}/videos`

// Function to create a video entry in BunnyCDN
const createVideoEntry = async (fileName) => {
  const response = await axios.post(bunnyStreamEndpoint, { title: fileName }, {
    headers: {
      AccessKey: BUNNY_STREAM_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  return response.data.guid
}

// Configure multer for handling file uploads in memory
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Export the configured modules and functions
module.exports = {  upload, cloudinary, createVideoEntry, bunnyStreamEndpoint }
                                
