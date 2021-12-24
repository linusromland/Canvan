import { Request, Response, Router } from 'express';
import { checkAuthenticated } from '../middleware/authentication';

const router = Router();

router.get('/user', checkAuthenticated, async (req: Request, res: Response) => {
	const user = await req.user;
	if (!user) res.redirect('/');
	res.json(user);
});

export default router;
