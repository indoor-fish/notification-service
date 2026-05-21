// Nodemailer stub — logs to console in development
// Replace with real nodemailer transport in production
export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  console.log(`[email.service] → TO: ${to} | SUBJECT: ${subject}`);
  console.log(`[email.service] BODY: ${body.slice(0, 200)}`);
}
