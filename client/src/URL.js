import SERVER_URL from './SERVER_URL';

const DEV_MODE = true;
const PORT = 1337;
const URL = DEV_MODE ? `http://localhost:${PORT}` : SERVER_URL;

export default URL;