import { MESSAGE_TOPICS } from '@indoor-fish/shared-libs';

// Templates are keyed by MESSAGE_TOPICS constants to create a direct semantic link
// between producers (order-service, payment-service, user-service) and this consumer
const templates: Record<string, (data: Record<string, unknown>) => { subject: string; body: string }> = {
  [MESSAGE_TOPICS.ORDER_CREATED]: (data) => ({
    subject: `Order Confirmation — Order #${data.orderId}`,
    body: `Your order #${data.orderId} has been confirmed. Total: $${data.totalAmount}. Thank you for shopping with us!`,
  }),
  [MESSAGE_TOPICS.ORDER_SHIPPED]: (data) => ({
    subject: `Your Order #${data.orderId} Has Shipped`,
    body: `Great news! Your order #${data.orderId} is on its way.`,
  }),
  [MESSAGE_TOPICS.PAYMENT_PROCESSED]: (data) => ({
    subject: `Payment Receipt — $${data.amount}`,
    body: `Your payment of $${data.amount} has been processed successfully. Payment ID: ${data.paymentId}.`,
  }),
  [MESSAGE_TOPICS.PAYMENT_FAILED]: (data) => ({
    subject: 'Payment Failed — Action Required',
    body: `Your payment (ID: ${data.paymentId}) could not be processed. Reason: ${data.reason}. Please update your payment method.`,
  }),
  [MESSAGE_TOPICS.USER_REGISTERED]: (data) => ({
    subject: `Welcome to IndoorFish, ${data.name}!`,
    body: `Hi ${data.name}, your account (${data.email}) has been created. Get started by browsing our catalog.`,
  }),
};

export function renderTemplate(topic: string, data: Record<string, unknown>): { subject: string; body: string } {
  const templateFn = templates[topic];
  if (!templateFn) return { subject: `Notification: ${topic}`, body: JSON.stringify(data) };
  return templateFn(data);
}
