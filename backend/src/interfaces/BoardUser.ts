//External Dependencies import
import { Types } from 'mongoose';

//Creates a Interface and exports it
export default interface iBoardUser {
	user: Types.ObjectId;
	permissions: string;
	joinedAt: Date;
}
