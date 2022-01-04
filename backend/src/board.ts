//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import Board from './models/Board';
import iUser from './interfaces/User';

/**
 * @name createBoard
 * @param  {string} name - Name of the board
 * @param  {string} userID - User Id of the user who created the board
 * @returns {Promise<Board>} - Returns the created board
 * @description This function creates a new board
 */
export async function createBoard(name: string, userID: string) {
	if (name && userID) {
		const board = new Board({
			name,
			createdBy: userID
		});

		//Saves the board
		await board.save();

		//Add the board owner to users and gives them owner permissions
		return await addUser(board._id, userID, 'owner');
	} else {
		return false;
	}
}

/**
 * @name addUser
 * @param  {Types.ObjectId} boardId - Board Id
 * @param  {string} userID - User Id
 * @param  {string} permissions - Permissions of the user
 * @returns {Promise<Board>} - Returns the updated board
 * @description This function adds a user to the board
 */
export async function addUser(boardId: Types.ObjectId, userID: string, permissions: string) {
	return await Board.updateOne(
		{ _id: boardId },
		{
			$push: {
				users: {
					user: userID,
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
export async function getBoards(providerUser: iUser) {
	if (providerUser) {
		const boards = await Board.find({
			users: {
				$elemMatch: {
					user: providerUser.id
				}
			}
		});
		console.log(boards);
		return boards;
	} else {
		return [];
	}
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

/**
 * @name addEntry
 * @param  {Types.ObjectId} boardId - Board Id
 * @param  {string} title - Title of the entry
 * @param  {string} description - Description of the entry
 * @param  {Types.ObjectId} createdBy - User Id of the user who created the entry
 * @description This function adds a new entry to the board
 */
export async function addEntry(boardId: Types.ObjectId, title: string, description: string, createdBy: Types.ObjectId, columnID: string) {
	const board = await getBoard(boardId);

	if (board) {
		const entry = {
			title,
			description,
			createdBy,
			createdAt: new Date()
		};

		const columns = board.columns;
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];
			if (column.id.toString() === columnID) {
				column.entries.push(entry);
				break;
			}
		}

		//Saves the entry
		await Board.updateOne(
			{ _id: boardId },
			{
				$set: {
					columns
				}
			}
		);

		return entry;
	} else {
		return false;
	}
}
