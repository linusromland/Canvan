//External Dependencies import
import { Schema, model, Types } from 'mongoose';

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
	name: {
		type: String,
		required: true
	},
	columns: {
		type: Object,
		default: columnDefault
	},
	users: [],
	createdBy: {
		type: Types.ObjectId,
		ref: 'User',
		required: true
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
