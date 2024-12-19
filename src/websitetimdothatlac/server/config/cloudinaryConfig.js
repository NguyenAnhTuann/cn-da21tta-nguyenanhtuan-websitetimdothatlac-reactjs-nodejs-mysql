const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: 'duk8odqun',
    api_key: '485926927892748',
    api_secret: 'CSaf5iaR5cC5cl7PiyNlN_uAaSQ'
});

module.exports = cloudinary;
