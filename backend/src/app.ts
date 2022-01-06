//External Dependencies import
import express from 'express';
import ip from 'ip';
import history from 'connect-history-api-fallback';
import path from 'path';
import * as dotenv from 'dotenv';
import { io, server, socketIOSetup } from './socket';

//Configuring dotenv
if (process.env.NODE_ENV === 'development') dotenv.config();

//Local Dependencies Import
import { setup as passportSetup } from './passport';
import { setup as connectToMongoDB } from './database';

//Variable Declarations
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOURL || 'mongodb://localhost:27017/';

//Configuring express
const app = express();
app.use(express.json());

//Passport Configuration
passportSetup(app);

//Socket.io Configuration
socketIOSetup(app);

io.on('connection', (socket: any) => {
	console.log('a user connected');
	socket.emit('test', 'first message');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

//Connecting to MongoDB
connectToMongoDB('Canvan', mongoURL);

//Routes import
import apiRoutes from './routes/api';
import authenticationRoutes from './routes/authentication';

app.use('/api', apiRoutes);
app.use('/auth', authenticationRoutes);

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

server.listen(port, () => {
	console.log(`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`);
});
