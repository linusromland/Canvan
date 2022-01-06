//External Dependencies import
import express from 'express';
import { createServer, Server } from 'http';
import { Server as socketIOServer } from 'socket.io';
import { authorize } from 'passport.socketio';
import { mongoStore } from './passport';

//Variable Declarations
let io: socketIOServer;
let server: Server;

/**
 * @name setupSocketIO
 * @param  {Express} app - Express.JS app object
 * @return {void}
 * @description Sets up Socket.IO
 */
export async function socketIOSetup(app: express.Express) {
	server = createServer(app);
	io = new socketIOServer().listen(server);
	io.use(
		authorize({
			key: 'connect.sid',
			secret: process.env.SECRET || 'keyboard cat',
			store: mongoStore
		})
	);
}

export { io, server };
