# Development Environment Setup

## 📋 Prerequisites

Before running the project locally, ensure you have:

- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password

---

## 🔧 Setup Instructions

### 1. Clone/Navigate to Project

```bash
cd /path/to/Magnuscit
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create `.env` File

Create `backend/.env`:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/magnus?retryWrites=true&w=majority

# Email (Gmail with App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Optional SMTP config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

⚠️ **Important:** Never commit `.env` file (already in `.gitignore`)

### 4. Run Backend (Express - Local Dev Only)

```bash
npm start
```

Server runs on: `http://localhost:5000`

---

## 🧪 Testing Locally

### Test Registration Endpoint

```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "test@gmail.com",
    "eventName": "Hackathon",
    "eventDate": "February 2nd, 2026"
  }'
```

### Test Bulk Send Endpoint

```bash
curl -X POST http://localhost:5000/api/registrations/bulk-send
```

### Expected Response

```json
{
  "success": true,
  "message": "Registration successful! Check your email for OD letter and QR code.",
  "data": {
    "id": "507f...",
    "name": "John Doe",
    "email": "test@gmail.com",
    "eventName": "Hackathon",
    "emailSent": true,
    "odLetterSent": true
  }
}
```

---

## 📨 Verify Email Delivery

1. Submit registration via API
2. Check inbox for email from `EMAIL_USER`
3. Verify email contains:
   - ✅ OD Letter PDF attachment
   - ✅ QR Code image

---

## 🚀 Development Notes

### Express Server (Local Only)
- Used for local development
- Handles Express routes
- **NOT** deployed to Vercel

### Serverless Handlers (`/api/*.js`)
- Pure async functions
- No Express dependency
- **ONLY** used on Vercel
- Used locally via `npm start` (Express routes call controllers)

### Asset Loading
- All logos/images in `backend/assets/`
- Loaded via `process.cwd()` paths
- Works both locally and on Vercel

---

## 🔍 Debugging Tips

### Check MongoDB Connection
```javascript
// Add to any file
const connectDB = require('./utils/dbConnect');
await connectDB();
console.log('MongoDB connected!');
```

### Check Email Credentials
```bash
# Test with Nodemailer
node -e "require('dotenv').config({path:'backend/.env'}); console.log(process.env.EMAIL_USER)"
```

### View Generated PDF
- PDFs are created in memory (Buffer)
- Attached to emails automatically
- Can't be viewed directly during development

### Check Logs
```bash
# Terminal output from npm start
# Shows all console.log() and errors
```

---

## 📁 Project Structure (for Development)

```
/backend
  ├── server.js              ← Express server (local only)
  ├── controllers/
  │   ├── registrationController.js
  │   └── emailController.js
  ├── models/
  │   └── Registration.js
  ├── routes/
  │   └── registrationRoutes.js
  ├── utils/
  │   ├── dbConnect.js
  │   └── generateODLetter.js
  ├── assets/
  │   ├── cit-logo.png
  │   ├── magnus-logo.png
  │   └── hod-sign.png
  ├── package.json
  ├── .env (⚠️ Not in repo)
  └── testLocal.js

/api
  ├── registrations.js       ← Serverless (Vercel)
  ├── bulk-send.js           ← Serverless (Vercel)
  └── index.js
```

---

## ✅ Development Checklist

- [ ] Node.js 16+ installed
- [ ] MongoDB Atlas account created
- [ ] Gmail App Password generated
- [ ] `.env` configured in `backend/`
- [ ] Dependencies installed: `npm install`
- [ ] Assets exist in `backend/assets/`
- [ ] Can start server: `npm start`
- [ ] Can successfully register user
- [ ] Email received with PDF + QR
- [ ] Bulk send processes pending users

---

## 🚀 After Local Testing

When ready to deploy:

```bash
# Make sure no uncommitted changes
git status

# Push to GitHub
git add .
git commit -m "feat: serverless backend refactor"
git push

# Deploy to Vercel
vercel --prod
```

---

## 📞 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "MONGO_URI not found"
- Check `.env` file exists in `/backend`
- Check `MONGO_URI` is set
- Verify connection string format

### "Email sending failed"
- Verify Gmail App Password (not regular password)
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Enable 2FA on Gmail account

### "Logos not found"
- Check files exist: `backend/assets/cit-logo.png`, etc.
- Verify file permissions (readable)
- Check `process.cwd()` returns correct path

### "Cannot connect to MongoDB"
- Verify `MONGO_URI` connection string
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for dev)
- Ensure database user has read/write permissions

---

## 📝 Environment Variable Reference

| Variable | Example | Required |
|----------|---------|----------|
| MONGO_URI | `mongodb+srv://user:pass@cluster.mongodb.net/db` | ✅ Yes |
| EMAIL_USER | `your_email@gmail.com` | ✅ Yes |
| EMAIL_PASS | `xxxx xxxx xxxx xxxx` (App Password) | ✅ Yes |
| SMTP_HOST | `smtp.gmail.com` | ❌ No (default) |
| SMTP_PORT | `587` | ❌ No (default) |

---

**Happy Development! 🎉**
