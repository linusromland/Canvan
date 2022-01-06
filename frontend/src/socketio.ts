import VueSocketIO from 'vue-3-socket.io';
import SocketIO from 'socket.io-client';

const options = { path: '/socket.io/' };

const VueSocket = new VueSocketIO({
	debug: true,
	connection: SocketIO('http://localhost:3000', options)
});

export default VueSocket;
