import imageRoutes from './api/image';
import { Router } from 'express';

const routes = Router();

routes.use('/images', imageRoutes);

export default routes;
