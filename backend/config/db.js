import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log(
			`Połączono z MongoDB na serwerze: ${db.connection.host}`.cyan.underline
		);
	} catch (error) {
		console.error(
			`Błąd połączenia z MongoDB: ${error.message}`.red.underline.bold
		);
		process.exit(1);
	}
};

export default connectDB;
