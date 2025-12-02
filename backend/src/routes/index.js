import express from 'express';
import generateRoutes from './generate.routes.js';
import paymentsRoutes from './payments.routes.js';
import usersRoutes from './users.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();
router.use('/generate', generateRoutes);
router.use('/payments', paymentsRoutes);
router.use('/users', usersRoutes);
router.use('/admin', adminRoutes);

export default router;
