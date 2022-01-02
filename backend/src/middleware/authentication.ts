//External Dependencies import
import { Request, Response, NextFunction } from 'express';

/**
 * @param  {Request} req - The request object
 * @param  {Response} res - The response object
 * @param  {NextFunction} next - The function to execute after this one
 * @returns null
 * @description This function checks if the user is authenticated
 */
export async function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
	//Checks if the user is authenticated
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/unauthorized');
}

/**
 * @param  {Request} req - The request object
 * @param  {Response} res - The response object
 * @param  {NextFunction} next - The function to execute after this one
 * @returns null
 * @description This function checks if the user is not authenticated
 */
export function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
	//Checks if the user is authenticated
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}
