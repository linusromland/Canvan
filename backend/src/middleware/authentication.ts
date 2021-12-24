//Dependencies import
import { Request, Response, NextFunction } from 'express';

export async function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/unauthorized');
}

export function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}
