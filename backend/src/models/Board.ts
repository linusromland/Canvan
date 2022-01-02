import { Schema, model } from 'mongoose';
import iBoard from '../interfaces/Board';

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

//Creates the Schema and exports it
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

const Board = model<iBoard>('Board', BoardSchema);

export default Board;
