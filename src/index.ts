import express, { Request, Response, NextFunction } from 'express';
import internalRoutes from './routes/internal.routes';
import adminRoutes from './routes/admin.routes';
import { AppError } from '@indoor-fish/shared-libs';

const app = express();
const PORT = process.env.PORT ?? 3005;

app.use(express.json());
app.use('/internal', internalRoutes);
app.use('/notifications', adminRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'notification-service' }));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.httpStatus).json({ error: err.message });
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
