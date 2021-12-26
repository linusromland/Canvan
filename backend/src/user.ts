import User from './models/User';
import * as MongoDB from 'mongodb';

const ObjectID = MongoDB.ObjectID;

export function createUser(displayName?: string, email?: string, accountType?: string, profilePicture?: string, id?: string) {
	const user = new User({
		displayName,
		email,
		accountType,
		providerID: id
	});
	if (profilePicture) user.profilePicture = profilePicture;
	console.log(user);
	return user;
}

export async function getInDBbyProviderID(id: string) {
	const user = await User.findOne({ providerID: id });
	return user;
}

export async function updateUserInformation(mongoID: string, displayName?: string, email?: string, profilePicture?: string) {
	await User.updateOne(
		{
			_id: new ObjectID(mongoID)
		},
		{
			$set: {
				displayName,
				email,
				profilePicture
			}
		}
	);
}
