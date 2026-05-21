import { Router } from 'express';
import { NotificationPayload, UnauthorizedError } from '@indoor-fish/shared-libs';
import { dispatch } from '../services/dispatch.service';

const ALLOWED_INTERNAL_SERVICES = ['order-service', 'payment-service', 'user-service'];

const router = Router();

router.post('/notify', async (req, res, next) => {
  try {
    // Validate that the request comes from a known internal service
    const callerService = req.headers['x-internal-service'] as string;
    if (!callerService || !ALLOWED_INTERNAL_SERVICES.includes(callerService)) {
      throw new UnauthorizedError(`Unknown internal service: ${callerService ?? 'none'}`);
    }

    const payload = req.body as NotificationPayload;
    const notificationId = await dispatch(payload);
    res.status(202).json({ notificationId, status: 'queued' });
  } catch (err) { next(err); }
});

export default router;
