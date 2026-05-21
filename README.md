# notification-service

Receives notification requests from all other services and dispatches email and SMS. A leaf node — no outbound dependencies to other platform services.

## Port: 3005

## API Endpoints
- `POST /internal/notify` — receive notification from internal service (requires `X-Internal-Service` header)
- `GET /notifications/history` — list all dispatched notifications
- `GET /notifications/:id` — get a specific notification

## Accepted Internal Services
- `order-service`
- `payment-service`
- `user-service`

## Supported Topics
- `order.created` — sends order confirmation email
- `order.shipped` — sends shipping confirmation email
- `payment.processed` — sends payment receipt
- `payment.failed` — sends payment failure alert
- `user.registered` — sends welcome email

## Dependencies
- None (leaf service — receives calls, makes no outbound HTTP calls)
# accuracy test trigger
