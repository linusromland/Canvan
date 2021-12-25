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
		failureRedirect: '/unauthorized'
	}),
	function (req: Request, res: Response) {
		res.redirect('/');
	}
);

router.get(
	'/github',
	passport.authenticate('github', {
		scope: ['user:email']
	})
);

router.get(
	'/github/callback',
	passport.authenticate('github', {
		failureRedirect: '/unauthorized'
	}),
	function (req: Request, res: Response) {
		res.redirect('/');
	}
);

router.get('/error', (req: Request, res: Response) => res.send('Unknown Error'));

router.get('/logout', checkAuthenticated, (req: Request, res: Response) => {
	//removes your session token and logs you out.
	req.logOut();
	res.redirect('/');
});

export default router;
