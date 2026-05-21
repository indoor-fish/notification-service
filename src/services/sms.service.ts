// Twilio stub — logs to console in development
// Replace with twilio.messages.create() in production
export async function sendSms(to: string, body: string): Promise<void> {
  console.log(`[sms.service] → TO: ${to} | BODY: ${body.slice(0, 160)}`);
}
