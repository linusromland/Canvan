//External Dependencies import
import { Types } from 'mongoose';

//Local Dependencies Import
import iColumnArray from './columnArray';
import iBoardUser from './BoardUser';

//Creates a Interface and exports it
export default interface iBoard {
	_id: Types.ObjectId;
	name: string;
	columns: Array<iColumnArray>;
	users: Array<iBoardUser>;
}
