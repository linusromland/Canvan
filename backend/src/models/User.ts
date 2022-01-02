//External Dependencies import
import { Schema, model } from 'mongoose';

//Local Dependencies Import
import iUser from '../interfaces/User';

//Creates the Schema
const UserSchema = new Schema({
	providerID: {
		type: String,
		required: true
	},
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
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

//Creates the model from Schema
const User = model<iUser>('User', UserSchema);

//Exports the model
export default User;
