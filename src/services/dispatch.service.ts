import { NotificationPayload, NotificationChannel, MESSAGE_TOPICS } from '@indoor-fish/shared-libs';
import { sendEmail } from './email.service';
import { sendSms } from './sms.service';
import { renderTemplate } from './template.service';

const _history: Array<{ id: string; payload: NotificationPayload; sentAt: Date; status: string }> = [];

export async function dispatch(payload: NotificationPayload): Promise<string> {
  const { subject, body } = renderTemplate(payload.topic, payload.data);
  const notificationId = crypto.randomUUID();

  if (payload.channel === NotificationChannel.EMAIL) {
    await sendEmail(payload.userId, subject, body);
  } else if (payload.channel === NotificationChannel.SMS) {
    await sendSms(payload.userId, body);
  }

  _history.push({ id: notificationId, payload, sentAt: new Date(), status: 'sent' });
  return notificationId;
}

export function getHistory() {
  return _history;
}

export function getById(id: string) {
  return _history.find(n => n.id === id);
}
