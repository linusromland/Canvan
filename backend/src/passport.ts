//External Dependencies import
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Express } from 'express';

// Variable Declarations
const mongoURL = process.env.MONGOURL || 'mongodb://localhost:27017/';

//Google Strategy
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

//Github Strategy
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

/**
 * @name setup
 * @param  {} app - The express app
 * @returns null
 * @description This function sets up the passport middleware
 */
export function setup(app: Express) {
	app.use(
		session({
			secret: process.env.SECRET || 'keyboard cat',
			store: MongoStore.create({
				mongoUrl: mongoURL,
				dbName: 'Canvan'
			}),
			resave: true,
			saveUninitialized: true
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, cb) {
		cb(null, user);
	});

	passport.deserializeUser(function (user, cb) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		cb(null, user);
	});
	passport.use(
		new GoogleStrategy(
			{
				clientID: GOOGLE_CLIENT_ID as string,
				clientSecret: GOOGLE_CLIENT_SECRET as string,
				callbackURL: GOOGLE_CALLBACK_URL as string
			},
			function (accessToken: string, refreshToken: string, profile: any, done: any) {
				return done(undefined, profile);
			}
		)
	);

	passport.use(
		new GitHubStrategy(
			{
				clientID: GITHUB_CLIENT_ID as string,
				clientSecret: GITHUB_CLIENT_SECRET as string,
				callbackURL: GITHUB_CALLBACK_URL as string
			},
			function (accessToken: string, refreshToken: string, profile: any, done: any) {
				return done(null, profile);
			}
		)
	);
}

export { passport };
