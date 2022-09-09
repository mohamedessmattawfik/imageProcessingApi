import express, { Request, Response } from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.listen(port, (): void => console.log(`Listening on port ${port}🚀🚀🚀`));
app.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcome to the first project in Advanced Web Development Nanodegree'
  );
});
app.use('/api', routes);

export default app;
