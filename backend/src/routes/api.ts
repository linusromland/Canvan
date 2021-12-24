import { Request, Response, Router } from 'express';
import { checkAuthenticated } from '../middleware/authentication';

const router = Router();

router.get('/user', checkAuthenticated, async (req: Request, res: Response) => res.json(await req.user));

export default router;
