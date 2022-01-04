//External Dependencies import
import { Schema, model, Types } from 'mongoose';

//Local Dependencies Import
import iBoard from '../interfaces/Board';

//Variable Declarations
const columnDefault = [
	{
		title: 'To Do',
		entries: [],
		id: new Types.ObjectId()
	},
	{
		title: 'In Progress',
		entries: [],
		id: new Types.ObjectId()
	},
	{
		title: 'Done',
		entries: [],
		id: new Types.ObjectId()
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
		type: String,
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
