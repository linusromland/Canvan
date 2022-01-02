//External Dependencies import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { checkAuthenticated } from '../middleware/authentication';
import { passport } from '../passport';
import { createUser, getInDBbyProviderID, updateUserInformation } from '../user';

//Variable Declarations
const router = Router();

/**
 * @name get/google
 * @description This route authenicates the user with google
 */
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

/**
 * @name get/google/callback
 * @description This route handles the callback from google
 */
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
				await createUser(user.displayName, user.emails[0].value, 'google', user._json.picture, user.id);
			}
		} else {
			if (user.displayName !== userInDB.displayName || user.email !== userInDB.email || user._json.picture !== user.profilePicture) await updateUserInformation(userInDB._id, user.displayName, user.emails[0].value, user._json.picture);
		}

		res.redirect('/');
	}
);

/**
 * @name get/github
 * @description This route authenicates the user with github
 */
router.get(
	'/github',
	passport.authenticate('github', {
		scope: ['user:email']
	})
);

/**
 * @name get/github/callback
 * @description This route handles the callback from github
 */
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
				await createUser(user.displayName, user.emails[0].value, 'github', user.photos[0].value, user.id);
			}
		} else {
			if (user.displayName !== userInDB.displayName || user.email !== userInDB.email || user.photos[0].value !== user.profilePicture) await updateUserInformation(userInDB._id, user.displayName, user.emails[0].value, user._json.picture);
		}

		res.redirect('/');
	}
);

/**
 * @name get/error
 * @description This route handles the error
 */
router.get('/error', (req: Request, res: Response) => {
	res.send('Unknown Error');
});

/**
 * @name get/Logout
 * @description This route logs the user out
 */
router.get('/logout', checkAuthenticated, (req: Request, res: Response) => {
	//removes your session token and logs you out.
	req.logOut();
	res.redirect('/');
});

//Exports the router
export default router;
