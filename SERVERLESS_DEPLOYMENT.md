# MAGNUS Event Registration - Serverless Architecture

## 🚀 Fully Vercel-Compatible Serverless System

This backend is **100% serverless** with:
- ✅ **No Express.js** in API routes
- ✅ **No filesystem writes** (all PDFs in-memory)
- ✅ **Cached MongoDB connections**
- ✅ **Pure serverless handlers**
- ✅ **Works locally AND on Vercel**

---

## 📁 Architecture

```
/api
  ├── registrations.js    → POST /api/registrations (pure handler)
  ├── bulk-send.js        → POST /api/bulk-send (pure handler)
  └── index.js            → Other routes

/backend
  ├── controllers/
  │   ├── emailController.js        → Email with buffer attachments
  │   └── registrationController.js → Business logic (Express routes)
  ├── models/
  │   └── Registration.js           → Mongoose schema
  ├── utils/
  │   ├── generateODLetter.js       → PDF as Buffer
  │   └── dbConnect.js              → Cached MongoDB connection
  ├── routes/                       → Express routes (local dev only)
  └── assets/                       → Read-only logos/signatures

/backend/server.js → Express server for LOCAL DEVELOPMENT ONLY
```

---

## 🔧 Environment Variables

Set these in `.env` (local) or Vercel dashboard (production):

```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/magnus?retryWrites=true&w=majority

# Email (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SMTP Config (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

⚠️ **Gmail Users**: Generate an [App Password](https://support.google.com/accounts/answer/185833)

---

## 🛠️ API Endpoints

### 1. Register User & Send Email
**Endpoint:** `POST /api/registrations`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventId": "EVT001",
  "eventName": "Hackathon",
  "eventDate": "February 2nd, 2026"
}
```

**Response:**
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

**Process:**
1. Save user to MongoDB
2. Generate unique QR code (JSON payload)
3. Generate OD Letter PDF (in-memory buffer)
4. Send email with PDF + QR attachments
5. Return success response

---

### 2. Bulk Send Pending Emails
**Endpoint:** `POST /api/bulk-send`

Sends emails to all users where `emailSent !== true`

**Response:**
```json
{
  "success": true,
  "message": "Bulk send completed",
  "total": 10,
  "sent": 9,
  "failed": 1,
  "results": [
    { "email": "user1@example.com", "status": "sent" },
    { "email": "user2@example.com", "status": "failed", "error": "..." }
  ]
}
```

**Features:**
- Processes max 50 users per invocation (Vercel timeout limits)
- 1-second delay between emails (rate limiting)
- Detailed results per user

---

## 📦 Local Development

### Install Dependencies
```bash
cd backend
npm install
```

### Start Express Server (Local Only)
```bash
npm start
```

Server runs on: `http://localhost:5000`

### Test Endpoints Locally
```bash
# Register user
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "eventName": "Hackathon",
    "eventDate": "February 2nd, 2026"
  }'

# Bulk send
curl -X POST http://localhost:5000/api/registrations/bulk-send
```

---

## 🚢 Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
cd /path/to/Magnuscit
vercel
```

Follow prompts to link project.

### Step 4: Set Environment Variables
```bash
# Via CLI
vercel env add MONGO_URI
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# Or via Dashboard
# Go to: Project Settings → Environment Variables
```

### Step 5: Deploy to Production
```bash
vercel --prod
```

Your API will be live at: `https://your-project.vercel.app/api/registrations`

---

## 🔍 MongoDB Schema

```javascript
{
  name: String (required),
  email: String (required),
  eventId: String,
  eventName: String (default: 'MAGNUS 2026'),
  eventDate: String (default: 'February 2nd, 2026'),
  qrData: String (JSON payload),
  emailSent: Boolean (default: false),
  odLetterSent: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🎯 Key Serverless Features

### ✅ No Express in API Routes
```javascript
// /api/registrations.js
module.exports = async (req, res) => {
  // Pure serverless handler
  // No Express app or router
  await connectDB();
  // ... business logic
};
```

### ✅ Cached MongoDB Connection
```javascript
// /backend/utils/dbConnect.js
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection; // Reuse across invocations
  }
  // ... connect
};
```

### ✅ PDF as Buffer (No Disk Writes)
```javascript
// /backend/utils/generateODLetter.js
const generateODLetter = async ({ studentName, eventName, eventDate }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    // ... generate PDF
    doc.end();
  });
};
```

### ✅ Email with Buffer Attachments
```javascript
// /backend/controllers/emailController.js
attachments: [
  {
    filename: "OD_Letter.pdf",
    content: odPdfBuffer, // Buffer, not file path
    contentType: "application/pdf"
  }
]
```

---

## 📧 Email Structure

Each email includes:

**1. OD Letter PDF (attached)**
- CIT logo (top-left, 110px width)
- Magnus logo (top-right, 90px width)
- Student name, event details
- HOD signature

**2. QR Code (embedded + attached)**
- Unique JSON payload:
  ```json
  {
    "app": "MAGNUS 2026",
    "action": "CHECK_IN",
    "user": {
      "id": "507f...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "timestamp": "2026-01-28T10:30:00.000Z"
  }
  ```

---

## 🚨 Troubleshooting

### MongoDB Connection Failed
- Check `MONGO_URI` format
- Whitelist `0.0.0.0/0` on MongoDB Atlas (for Vercel)
- Ensure database user has read/write permissions

### Email Sending Failed
- Verify Gmail App Password (not regular password)
- Check `EMAIL_USER` and `EMAIL_PASS` are set
- Enable 2FA and generate App Password

### Logos Not Found
- Ensure files exist: `backend/assets/cit-logo.png`, `magnus-logo.png`, `hod-sign.png`
- Check file permissions (readable)
- Verify paths use `process.cwd()` for Vercel compatibility

### Vercel Timeout (10s limit)
- Bulk send processes max 50 users
- For more users, call `/api/bulk-send` multiple times
- Consider upgrading to Vercel Pro (60s timeout)

### Cold Start Delays
- First request may be slower (MongoDB connection)
- Subsequent requests use cached connection
- Keep functions warm with monitoring tools

---

## 📊 Performance & Limits

| Metric | Value |
|--------|-------|
| Function timeout (Hobby) | 10 seconds |
| Function timeout (Pro) | 60 seconds |
| MongoDB connection pooling | 10 connections |
| Bulk send batch size | 50 users |
| Email rate limit | 1 per second |
| Max PDF size | ~500KB |

---

## 🔒 Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use MongoDB Atlas IP whitelist** - Only allow Vercel IPs
3. **Rotate email passwords** - Use App Passwords, not main password
4. **Validate input** - Check name/email format before processing
5. **Rate limiting** - Implement on `/api/bulk-send` if public

---

## 🧪 Testing

### Test Registration Locally
```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Test on Vercel
```bash
curl -X POST https://your-project.vercel.app/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Expected Response
```json
{
  "success": true,
  "message": "Registration successful! Check your email for OD letter and QR code.",
  "data": { ... }
}
```

---

## 📝 Key Differences: Local vs Vercel

| Feature | Local Dev | Vercel Production |
|---------|-----------|-------------------|
| Server | Express (`server.js`) | Serverless functions (`/api`) |
| Routes | Express Router | Pure handlers |
| File system | Read/Write | Read-only |
| MongoDB | Direct connection | Cached connection |
| Asset paths | `process.cwd()` | `process.cwd()` |
| Environment | `.env` file | Vercel dashboard |

---

## 🤝 Support

**Team Magnus Contact:**
- Email: magnus@citchennai.net
- MongoDB Logs: [Atlas Dashboard](https://cloud.mongodb.com)
- Vercel Logs: [Vercel Dashboard](https://vercel.com/dashboard)

---

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [Nodemailer Documentation](https://nodemailer.com/)
- [PDFKit API](https://pdfkit.org/)

---

**Built with ❤️ by Team Magnus**  
**Chennai Institute of Technology**
```bash
vercel env add MONGO_URI
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
```

Or set them in the Vercel Dashboard:
`Project Settings → Environment Variables`

### Step 4: Redeploy
```bash
vercel --prod
```

---

## 🧪 Testing Locally

### Start Backend Server
```bash
cd backend
npm install
npm start
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "eventName": "Hackathon",
    "eventDate": "February 2nd, 2026"
  }'
```

### Test Bulk Send
```bash
curl -X POST http://localhost:5000/api/registrations/bulk-send
```

---

## 🔍 MongoDB Schema

```javascript
{
  name: String,
  email: String,
  eventId: String (optional),
  eventName: String (default: 'MAGNUS 2026'),
  eventDate: String (default: 'February 2nd, 2026'),
  qrData: String (JSON payload),
  emailSent: Boolean (default: false),
  odLetterSent: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Key Serverless Considerations

### ✅ What Works
- PDF generation as Buffer (no disk writes)
- Email attachments from buffers
- MongoDB connections (with caching)
- Asset loading from `/backend/assets`

### ❌ What Doesn't Work
- `fs.writeFile()` - Vercel has read-only filesystem
- Saving files to `/tmp` - not persistent across invocations
- Long-running processes - 10s timeout on Hobby plan

---

## 📧 Email Structure

Each registration email includes:
1. **OD Letter PDF** (attached)
   - CIT logo (top-left)
   - Magnus logo (top-right)
   - Student name, event details
   - HOD signature

2. **QR Code** (embedded + attached)
   - Unique JSON payload
   - Contains user ID, name, email
   - For event check-in

---

## 🚨 Troubleshooting

### Error: "MongoDB connection failed"
- Check `MONGO_URI` format
- Ensure IP whitelist on MongoDB Atlas (allow 0.0.0.0/0 for Vercel)

### Error: "Email sending failed"
- Verify Gmail App Password
- Check `EMAIL_USER` and `EMAIL_PASS`
- Enable "Less Secure Apps" if not using App Password

### Error: "Logo not found"
- Ensure assets are in `/backend/assets`
- Check file names: `cit-logo.png`, `magnus-logo.png`, `hod-sign.png`

### Error: "Cannot write to filesystem"
- Never use `fs.writeFile()` on Vercel
- Always generate PDFs as buffers

---

## 📝 Notes

- **Rate Limiting**: Built-in 1-second delay between bulk emails
- **Timeouts**: Vercel serverless functions have 10s limit (Hobby) / 60s (Pro)
- **Cold Starts**: First request may be slower due to MongoDB connection
- **Asset Size**: Keep logos small (<500KB) for faster function starts

---

## 🤝 Support

For issues or questions:
- Email: magnus@citchennai.net
- MongoDB: Check logs in Atlas dashboard
- Vercel: Check function logs in Vercel dashboard

---

**Built with ❤️ by Team Magnus**
