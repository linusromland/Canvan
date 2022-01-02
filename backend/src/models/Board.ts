//External Dependencies import
import { Schema, model } from 'mongoose';

//Local Dependencies Import
import iBoard from '../interfaces/Board';

//Variable Declarations
const columnDefault = [
	{
		title: 'To Do',
		entries: []
	},
	{
		title: 'In Progress',
		entries: []
	},
	{
		title: 'Done',
		entries: []
	}
];

//Creates the Schema
const BoardSchema = new Schema({
	columns: {
		type: Object,
		default: columnDefault
	},
	users: {
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		permissions: {
			type: String,
			default: 'user'
		},
		joinedAt: {
			type: Date,
			default: Date.now
		}
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

//Creates the model from Schema
const Board = model<iBoard>('Board', BoardSchema);

//Exports the model
export default Board;
