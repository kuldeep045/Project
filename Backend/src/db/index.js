import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
	try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

		console.log(
			'CONNECTED TO DATABASE!!! DB HOST: ',
			connectionInstance.connection.host
		);
	} catch (error) {
		console.log('ERROR CONNECTING TO DB', error);
		process.exit(1);
	}
};
export default connectDB;
