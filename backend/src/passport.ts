//Dependencies import
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Express } from 'express';

//Local Variables
const mongoURL = process.env.MONGOURL || 'mongodb://localhost:27017/';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

/**
 * @param  {} app
 *
 * This function initalizes passport for Google Login
 */
export function setup(app: Express) {
	app.use(
		session({
			secret: process.env.SECRET || 'keyboard cat',
			store: MongoStore.create({
				mongoUrl: mongoURL,
				dbName: 'ClientoryX'
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
			function (accessToken, refreshToken, profile, done) {
				return done(undefined, profile);
			}
		)
	);
}

exports.passport = passport;
