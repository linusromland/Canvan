//External Dependencies import
import { Express } from 'express';
import { createServer, Server } from 'http';
import { Server as socketIOServer } from 'socket.io';

//Variable Declarations
let io: socketIOServer;
let server: Server;

/**
 * @name setupSocketIO
 * @param  {Express} app - Express.JS app object
 * @return {void}
 * @description Sets up Socket.IO
 */
export async function setupSocketIO(app: Express) {
	server = createServer(app);
	io = new socketIOServer().listen(server);
}

export { io, server };
