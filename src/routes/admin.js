import { Router } from 'express';
import {
  businesses,
  users,
  editUserById,
  getUserById,
  getBusinesseById,
  editBusinesById,
  getReviewsByUserId,
  deleteReviewById
} from '../controllers/admin';

import middleware from '../middleware';

const router = Router();
const { pagination } = middleware;

router.get('/businesses', pagination, businesses);
router.get('/businesses/:id', getBusinesseById);
router.put('/businesses/:id', editBusinesById);

router.put('/users/:id', editUserById);
router.get('/users/:id', getUserById);
router.get('/users', pagination, users);

router.get('/reviewsbyuserid/:id', getReviewsByUserId);
router.get('/deletereviewbyid/:id', deleteReviewById);

export default router;
