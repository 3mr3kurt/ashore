import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { fileURLToPath } from 'url';
import url from 'url';

import path from 'path';
const app = express();
const port = 3000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static('public'));

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const connectionString = config.dbconf;

mongoose.connect(connectionString, {
  directConnection: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model('User', userSchema);

app.post('/saveName', express.json(), async (req, res) => {
  const userName = req.body.name;
  const user = new User({ name: userName });
  await user.save();
  res.send('Name saved successfully');
});

app.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, 'public', `${imageName}.jpg`));
});

app.get('/text/:textName', (req, res) => {
  const textName = req.params.textName;
  res.sendFile(path.join(__dirname, 'public', `${textName}.txt`));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
