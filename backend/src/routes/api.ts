//External Dependencies Import
import { Request, Response, Router } from 'express';

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

export default router;
