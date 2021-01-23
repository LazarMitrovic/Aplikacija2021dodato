import http from 'http';
import App from './app.js';

const port = 3001;

const server = http.createServer(App);


server.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})