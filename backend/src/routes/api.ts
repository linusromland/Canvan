//External Dependencies Import
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';

//Local Dependencies Import
import { createBoard } from '../board';

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
router.post('/createBoard', async (req: Request, res: Response) => {
	//TODO create interface for it
	const user = (await req.user) as any;
	if (user) {
		const board = await createBoard(req.body.name, new Types.ObjectId(user._id));
		res.json(board).status(200);
	}
});

export default router;
