const mongoURL = process.env.MONGOURL;

const mongoOptions = {
	dbName: "ReddiitDB",
	family: 4,
	bufferCommands: true,
	maxPoolSize: 100,
	socketTimeoutMS: 30000,
	connectTimeoutMS: 30000,
	serverSelectionTimeoutMS: 5000,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

const connectCallback = function (err, data) {
	if (err) throw err;
	console.log(`Mongodb connected with server: ${data.connection.host}`);
};

module.exports = {
	mongoURL,
	mongoOptions,
	connectCallback,
};
