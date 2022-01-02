//External Dependencies Import
import { ObjectID } from 'mongodb';

//Local Dependencies Import
import User from './models/User';

/**
 * @name createUser
 * @param  {string} displayName? - The display name of the user
 * @param  {string} email? - The email of the user
 * @param  {string} accountType? - The account type of the user
 * @param  {string} profilePicture? - The profile picture of the user
 * @param  {string} id? - The provider ID of the user
 * @returns {Promise<User>} - The user object
 * @description This function creates a new user
 */
export async function createUser(displayName?: string, email?: string, accountType?: string, profilePicture?: string, id?: string) {
	// Creates a new user object
	const user = new User({
		displayName,
		email,
		accountType,
		providerID: id
	});

	// If the user has a profile picture, save it
	if (profilePicture) user.profilePicture = profilePicture;

	// Save the user
	return await user.save();
}

/**
 * @name getInDBbyProviderID
 * @param  {string} id - The providerID of the user
 * @returns {Promise<User>} - A promise that resolves to the user
 * @description This function returns a promise that resolves to the user with the given providerID
 */
export async function getInDBbyProviderID(id: string) {
	return await User.findOne({ providerID: id });
}

/**
 * @name updateUserInformation
 * @param  {string} mongoID - The mongoID of the user
 * @param  {string} displayName? - The display name of the user
 * @param  {string} email? - The email of the user
 * @param  {string} profilePicture? - The profile picture of the user
 * @returns null
 * @description This function updates the user in the database
 */
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
