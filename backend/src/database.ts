//Dependencies import
import { connect, connection, HydratedDocument, ConnectOptions } from 'mongoose';
import iUser from './interfaces/User';

let db;

/**
 * @param  {} collectionname
 * @param  {} connectURL
 *
 * This function creates a connection to MongoDB with the connectURl & to the collection specifed with collectionname
 */
export function setup(collectionname: string, connectURL: string) {
	const dbLink = connectURL + collectionname;
	connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

	db = connection;
	db.on('error', console.error.bind(console, 'Error while connecting to MongoDB using the following mongoURL: "' + dbLink + '"'));
	db.once('open', function () {
		console.info('Connected to MongoDB using collection "' + collectionname + '"');
	});
}

/**
 * @param  {} input
 *
 * This function takes input with type Model. Saves that model in Database.
 * ! Can't be used before connect()
 */
export async function saveToDB(input: HydratedDocument<iUser>) {
	await input.save(() => {
		console.info('Saved model to Database');
	});
}

export { db };
