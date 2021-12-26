//Dependencies import
import { Request, Response, Router } from 'express';
const router = Router();

//Local Dependencies
import { checkAuthenticated } from '../middleware/authentication';
import { passport } from '../passport';
import { createUser, getInDBbyProviderID, updateUserInformation } from '../user';
import { saveToDB } from '../database';

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
	async function (req: Request, res: Response) {
		// TODO: Change from use of type any
		const user: any = await req.user;
		const userInDB = await getInDBbyProviderID(user.id);
		if (!userInDB) {
			if (user) {
				const userModel = createUser(user.displayName, user.emails[0].value, 'google', user._json.picture, user.id);
				await saveToDB(userModel);
			}
		} else {
			if (user.displayName !== userInDB.displayName || user.email !== userInDB.email || user._json.picture !== user.profilePicture) await updateUserInformation(userInDB._id, user.displayName, user.emails[0].value, user._json.picture);
		}

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
	async function (req: Request, res: Response) {
		// TODO: Change from use of type any
		const user: any = await req.user;
		const userInDB = await getInDBbyProviderID(user.id);
		if (!userInDB) {
			if (user) {
				const userModel = createUser(user.displayName, user.emails[0].value, 'github', user.photos[0].value, user.id);
				await saveToDB(userModel);
			}
		} else {
			if (user.displayName !== userInDB.displayName || user.email !== userInDB.email || user.photos[0].value !== user.profilePicture) await updateUserInformation(userInDB._id, user.displayName, user.emails[0].value, user._json.picture);
		}

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
