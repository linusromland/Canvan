//External Dependencies Import
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';

//Local Dependencies Import
import { createBoard, getBoards } from '../board';
import { checkAuthenticated } from '../middleware/authentication';

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
		await createBoard(req.body.name, new Types.ObjectId(user._id));
		const boards = await getBoards();

		res.json(boards).status(200);
	}
});

/**
 * @name get/boards
 * @description This route returns all the boards
 */
router.get('/boards', checkAuthenticated, async (req: Request, res: Response) => {
	const boards = await getBoards();
	res.json(boards).status(200);
});

export default router;
