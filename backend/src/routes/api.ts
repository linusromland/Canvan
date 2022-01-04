//External Dependencies Import
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';

//Local Dependencies Import
import { createBoard, getBoards, getBoardById, addEntry } from '../board';
import { checkAuthenticated } from '../middleware/authentication';
import iUser from '../interfaces/User';

//Variable Declarations
const router = Router();

/**
 * @name get/user
 * @description This route returns the user
 */
router.get('/user', async (req: Request, res: Response) => {
	const user = await req.user;
	if (user) {
		res.json(user).status(200);
	} else {
		res.status(401).send('Unauthorized');
	}
});

/**
 * @name post/board
 * @description This route creates a new board
 */
router.post('/createBoard', checkAuthenticated, async (req: Request, res: Response) => {
	//TODO create interface for it
	const user = (await req.user) as any;
	if (user) {
		await createBoard(req.body.name, user.id);
		const boards = await getBoards(user as iUser);

		res.json(boards).status(200);
	}
});

/**
 * @name get/boards
 * @description This route returns all the boards
 */
router.get('/boards', checkAuthenticated, async (req: Request, res: Response) => {
	const user = await req.user;
	const boards = await getBoards(user as iUser);
	res.json(boards).status(200);
});

/**
 * @name get/board/id
 * @description This route returns the board with the given id
 */
router.get('/board/:id', checkAuthenticated, async (req: Request, res: Response) => {
	try {
		const board = await getBoardById(new Types.ObjectId(req.params.id));
		if (board) {
			res.json(board).status(200);
		} else {
			res.status(404).send('Not Found');
		}
	} catch {
		res.status(404).send('Not Found');
	}
});

/**
 * @name post/createEntry
 * @description This route creates a new entry
 */
router.post('/createEntry', checkAuthenticated, async (req: Request, res: Response) => {
	//TODO create interface for it
	const user = (await req.user) as any;
	if (user) {
		await addEntry(new Types.ObjectId(req.body.boardId), req.body.title, req.body.description, new Types.ObjectId(user._id), req.body.columnID);
		res.status(200).send('OK');
	} else {
		res.status(401).send('Unauthorized');
	}
});

export default router;
