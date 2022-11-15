import express from 'express';
import ReactDOM from 'react-dom/server';
import { App} from '../App';
import { indexTemplate} from '../server/indexTemplate';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/static', express.static('./dist/client'));

app.get('/auth', (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
    {
      auth: { username: process.env.CLIENT_ID, password: '4fYKchScG2TjRY-wtY2nqF15_dpFBA' },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  )
  .then(({ data }) => {
    res.send(
      indexTemplate(ReactDOM.renderToString(App()), data['access_token']),
    );
  })
  .catch(console.log);
});

app.get('*', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(App())),
  );
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
