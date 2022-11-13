import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

app.use('/', express.static(path.resolve(__dirname, '../../client/public')));
app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));

app.listen(port, () => {
	console.log(`Drag & Drop app listening on port ${port}`);
});
