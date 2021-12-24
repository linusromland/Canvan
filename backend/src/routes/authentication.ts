//Dependencies import
import { Request, Response, Router } from 'express';
const router = Router();

//Local Dependencies
import { checkAuthenticated, checkNotAuthenticated } from '../middleware/authentication';
import { passport } from '../passport';

router.get('/error', (req: Request, res: Response) => res.send('error logging in'));

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/error'
	}),
	async function (req: Request, res: Response) {
		res.redirect('/');
	}
);

router.get('/logout', checkAuthenticated, (req: Request, res: Response) => {
	//removes your session token and logs you out.
	req.logOut();
	res.redirect('/');
});

export default router;
