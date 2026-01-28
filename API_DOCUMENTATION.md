# 📚 API Documentation

## Base URL

- **Local:** `http://localhost:5000/api`
- **Production:** `https://your-project.vercel.app/api`

---

## Authentication

Currently, no authentication required. In production, consider adding:
- API key validation
- JWT tokens
- Rate limiting

---

## Endpoints

---

## 1. Register New User

**Endpoint:** `POST /api/registrations`

**Description:** Register a user for the event and send OD letter + QR code via email.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventId": "EVT001",
  "eventName": "Hackathon",
  "eventDate": "February 2nd, 2026"
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ | Student's full name |
| email | string | ✅ | Student's email address |
| eventId | string | ❌ | Event identifier |
| eventName | string | ❌ | Event name (default: MAGNUS 2026) |
| eventDate | string | ❌ | Event date (default: February 2nd, 2026) |

### Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Registration successful! Check your email for OD letter and QR code.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "Hackathon",
    "eventDate": "February 2nd, 2026",
    "emailSent": true,
    "odLetterSent": true,
    "createdAt": "2026-01-28T10:30:00.000Z"
  }
}
```

### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "success": false,
  "message": "Name and email are required"
}
```

**405 Method Not Allowed** - Using wrong HTTP method
```json
{
  "success": false,
  "message": "Method Not Allowed. Use POST."
}
```

**500 Internal Server Error** - Database or email error
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "MongoDB connection failed"
}
```

### Example cURL Request

```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "Hackathon",
    "eventDate": "February 2nd, 2026"
  }'
```

### Example JavaScript Request

```javascript
fetch('http://localhost:5000/api/registrations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    eventName: 'Hackathon',
    eventDate: 'February 2nd, 2026'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### What Happens

1. ✅ User data saved to MongoDB
2. ✅ Unique QR code generated (JSON payload with user ID)
3. ✅ OD Letter PDF created as in-memory buffer
4. ✅ Email sent with PDF + QR attachments
5. ✅ Database updated: `emailSent: true`, `odLetterSent: true`

### Email Contents

**Subject:** OD Letter & QR Code – MAGNUS 2026 🎓

**Body:**
- Welcome message with student name
- OD Letter PDF attachment (with CIT + Magnus logos)
- QR Code image (embedded + attached)
- Instructions (print OD, bring QR, 8:00 AM start)

---

## 2. Bulk Send Pending Emails

**Endpoint:** `POST /api/bulk-send`

**Description:** Send emails to all registered users where `emailSent !== true`.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{}
```

No body parameters required.

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Bulk send completed",
  "total": 10,
  "sent": 9,
  "failed": 1,
  "results": [
    {
      "email": "user1@example.com",
      "status": "sent"
    },
    {
      "email": "user2@example.com",
      "status": "failed",
      "error": "Invalid email address"
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Request succeeded |
| message | string | Status message |
| total | number | Total pending users processed |
| sent | number | Successfully sent |
| failed | number | Failed to send |
| results | array | Details per user |

### Error Responses

**405 Method Not Allowed**
```json
{
  "success": false,
  "message": "Method Not Allowed. Use POST."
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Bulk send failed",
  "error": "MongoDB connection timeout"
}
```

### Example cURL Request

```bash
curl -X POST http://localhost:5000/api/bulk-send \
  -H "Content-Type: application/json"
```

### Example JavaScript Request

```javascript
fetch('http://localhost:5000/api/bulk-send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### Behavior

- Processes **max 50 users per invocation** (Vercel timeout limit)
- 1-second delay between emails (rate limiting)
- Updates database: `emailSent: true`, `odLetterSent: true`
- Returns detailed results for each user
- Can be called multiple times to process all pending users

### Example Scenario

```
Initial state:
- 150 users in database
- 100 users have emailSent: true
- 50 users have emailSent: false

Invocation 1: /api/bulk-send
- Processes 50 pending users
- Sends 48 emails (2 failed)
- Response: { total: 50, sent: 48, failed: 2 }

Invocation 2: /api/bulk-send
- All users have emailSent: true
- Response: { total: 0, sent: 0, failed: 0, message: "No pending users found" }
```

---

## Response Formats

### Success Response

```json
{
  "success": true,
  "message": "User-friendly message",
  "data": {
    "...": "response data"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details (optional)"
}
```

---

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Bulk send completed |
| 201 | Created | User registered successfully |
| 400 | Bad Request | Missing required fields |
| 405 | Method Not Allowed | Wrong HTTP method (GET instead of POST) |
| 500 | Internal Server Error | Database/email error |

---

## Rate Limiting

**Current Limits:**
- Email rate: 1 per second (hardcoded in bulk-send)
- Bulk send batch: 50 users per invocation
- No API request rate limit (consider adding for production)

**Future Considerations:**
- Add request rate limiting per IP
- Add authentication/API keys
- Implement request quotas

---

## CORS

**Allowed Origins:** All (`*`)

**Allowed Methods:** POST, OPTIONS

**Allowed Headers:** Content-Type

For production, restrict CORS to your domain:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com');
```

---

## Data Models

### Registration Document (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String,              // Student name
  email: String,             // Student email
  eventId: String,           // Optional event ID
  eventName: String,         // Event name (default: MAGNUS 2026)
  eventDate: String,         // Event date (default: February 2nd, 2026)
  qrData: String,            // JSON payload with user info
  emailSent: Boolean,        // Email sent successfully?
  odLetterSent: Boolean,     // OD letter included in email?
  createdAt: Date,           // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

### QR Payload

```json
{
  "app": "MAGNUS 2026",
  "action": "CHECK_IN",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2026-01-28T10:30:00.000Z"
}
```

---

## Testing

### Test with Postman

1. Import collection or create new requests
2. Add `http://localhost:5000/api` as base URL
3. Create POST request to `/registrations`
4. Add body:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com"
   }
   ```
5. Send and check response

### Test with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

# Bulk send
curl -X POST http://localhost:5000/api/bulk-send
```

### Test with JavaScript

```javascript
const register = async (name, email) => {
  const res = await fetch('/api/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  return res.json();
};

register('John', 'john@example.com').then(console.log);
```

---

## Webhooks (Future)

Planned for future implementation:
- Google Forms integration
- Payment confirmation webhooks
- Email delivery confirmations

---

## Versioning

Current API Version: `v1` (implicit)

Future versions could use:
- `/api/v1/registrations`
- `/api/v2/registrations`

---

## Support

For API issues:
- Check logs: Vercel dashboard or local terminal
- Verify environment variables
- Test with different input data
- Email: magnus@citchennai.net

---

**Last Updated:** January 28, 2026  
**Status:** Production Ready ✅
