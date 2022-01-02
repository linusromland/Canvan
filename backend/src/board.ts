//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import Board from './models/Board';

/**
 * @name createBoard
 * @param  {string} name - Name of the board
 * @param  {Types.ObjectId} createdBy - User Id of the user who created the board
 * @returns {Promise<Board>} - Returns the created board
 * @description This function creates a new board
 */
export async function createBoard(name: string, createdBy: Types.ObjectId) {
	if (name && createdBy) {
		const board = new Board({
			name,
			createdBy
		});

		//Saves the board
		await board.save();

		//Add the board owner to users and gives them owner permissions
		return await addUser(board._id, createdBy, 'owner');
	} else {
		return false;
	}
}

/**
 * @name addUser
 * @param  {Types.ObjectId} boardId - Board Id
 * @param  {Types.ObjectId} user - User Id
 * @param  {string} permissions - Permissions of the user
 * @returns {Promise<Board>} - Returns the updated board
 * @description This function adds a user to the board
 */
export async function addUser(boardId: Types.ObjectId, user: Types.ObjectId, permissions: string) {
	return await Board.updateOne(
		{ _id: boardId },
		{
			$push: {
				users: {
					user,
					permissions,
					joinedAt: new Date()
				}
			}
		}
	);
}

/**
 * @name getBoard
 * @param  {Types.ObjectId} boardId - Board Id
 * @returns {Promise<Board>} - Returns the board
 * @description This function returns the board from id
 */
export async function getBoard(boardId: Types.ObjectId) {
	return await Board.findById(boardId);
}

/**
 * @name getBoards
 * @returns {Promise<Board[]>} - Returns the boards
 * @description This function returns all the boards
 */
export async function getBoards() {
	return await Board.find();
}

/**
 * @name getBoardById
 * @param  {Types.ObjectId} boardId - Board Id
 * @returns {Promise<Board>} - Returns the board
 * @description This function returns the board from id
 */
export async function getBoardById(boardId: Types.ObjectId) {
	return await Board.findById(boardId);
}
