import { Request, Response, Router } from 'express';

const router = Router();

router.get('/user', async (req: Request, res: Response) => {
	const user = await req.user;
	if (user) {
		res.json(user).status(200);
	} else {
		res.status(401).send('Unauthorized');
	}
});

export default router;
