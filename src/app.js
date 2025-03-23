import express from 'express'
import urlRoute from './routes/url.route.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.urlencoded({extended:false}));
app.use('/api/v1/',urlRoute);
app.use(errorHandler);

export default app;