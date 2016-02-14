import path from 'path';
import express from 'express';

const router = express.Router();

if (process.env.NODE_ENV === 'production') {
  router.use(express.static(path.resolve(__dirname, '../../..', 'dist')));
} else {
  router.use(express.static(path.resolve(__dirname, '../../..', '.tmp')));
  router.use(express.static(path.resolve(__dirname, '../../..', 'public')));
}

export default router;
