import express from 'express';
import ReactDOM from 'react-dom/server';
import { App} from '../App';
import { indexTemplate} from '../server/indexTemplate';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/static', express.static('./dist/client'));

app.get('*', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(App())),
  );
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
