import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async() => {    
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET || ''
    });
};

export default connectCloudinary;