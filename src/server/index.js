import '../global';

import path from 'path';
import express from 'express';
import {createEngine} from 'express-react-views';
import staticRouter from './routers/static';
import ssrRouter from './routers/ssr';
import errorRouter from './routers/error';

const server = express();

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jsx');
server.engine('jsx', createEngine({ transformViews: false }));

server.use(staticRouter);
server.use(ssrRouter);
server.use(errorRouter.notFound);
server.use(errorRouter.internalServerError);

export function listen(port) { server.listen(port); };
