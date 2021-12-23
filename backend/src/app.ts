//Dependencies
import express from 'express';
import ip from 'ip';
import history from 'connect-history-api-fallback';
import path from 'path';
import * as dotenv from 'dotenv';

//Configuring dotenv
if (process.env.NODE_ENV === 'development') dotenv.config();

//Local Dependencies
import { setup as passportSetup } from './passport';

//Variable initialization
const port = process.env.PORT || 3000;

// Configuring express
const app = express();

//Passport Configuration
passportSetup(app);

//Routes import
import apiRoutes from './routes/api';
app.use('/api', apiRoutes);

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

app.listen(port, () => {
	console.log(`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`);
});
