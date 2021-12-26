import { Schema, model } from 'mongoose';
import iUser from '../interfaces/User';

//Creates the Schema and exports it
const UserSchema = new Schema({
	displayName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	profilePicture: {
		type: String,
		default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
	accountType: {
		type: String,
		required: true
	}
});

const User = model<iUser>('User', UserSchema);

module.exports = User;
