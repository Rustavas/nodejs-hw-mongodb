import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';



export const setupServer = () => {

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.json());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(contactsRouter);

  app.use(errorHandler);
  app.use('*', notFoundHandler);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}