import { Router } from 'express';
import { getHistory, getById } from '../services/dispatch.service';

const router = Router();

router.get('/history', (_req, res) => {
  res.json({ notifications: getHistory() });
});

router.get('/:id', (req, res) => {
  const notification = getById(req.params.id);
  if (!notification) return res.status(404).json({ error: 'Notification not found' });
  res.json({ notification });
});

export default router;
