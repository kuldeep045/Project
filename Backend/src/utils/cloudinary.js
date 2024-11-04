import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import ApiError from '../utils/ApiError.js';
import fs from 'fs';
dotenv.config();




cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const uploadOnCloud = async (path) => {
	try {
		if (!path) return null;

		const response = await cloudinary.uploader.upload(path, {
			resource_type: 'auto',
		});

		fs.unlinkSync(path);

		return response;
	} catch (error) {
		fs.unlinkSync(path);
		return null;
	}
};

export default uploadOnCloud;
