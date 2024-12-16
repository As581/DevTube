// Import necessary modules
const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const ImageKit = require('imagekit')
const axios = require('axios')
let BUNNY_STREAM_LIBRARY_ID="319193";
let BUNNY_STREAM_API_KEY="48f3dc8c-7481-4aaf-b58327ea1483-4efd-4f5c"
// MongoDB connection URL from environment variables
const url = 'mongodb+srv://av0232016:FrKytsFWlRU9Wqc4@youtube.nphen.mongodb.net/?retryWrites=true&w=majority&appName=YouTube';

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
  cloud_name:'dgwqgrbof',
  api_key:'457492125556172',
  api_secret:'eBEzvKQWTSuFFxrhnb4N6ChzDG8',
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
                                
