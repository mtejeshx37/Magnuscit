# 🚀 Quick Start Guide - Serverless Backend

## ✅ Verification Checklist

Before deploying, verify:

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created with read/write permissions
- [ ] IP whitelist configured (0.0.0.0/0 for Vercel)
- [ ] Gmail App Password generated
- [ ] Assets exist: `backend/assets/cit-logo.png`, `magnus-logo.png`, `hod-sign.png`
- [ ] `.env` file configured (for local testing)

---

## 🏃 Quick Deploy

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd /path/to/Magnuscit
vercel

# 4. Add environment variables
vercel env add MONGO_URI
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# 5. Deploy to production
vercel --prod
```

---

## 🧪 Quick Test

### Local
```bash
cd backend
npm install
npm start

curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

### Production
```bash
curl -X POST https://your-project.vercel.app/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

---

## 📁 File Structure (Serverless Safe)

```
✅ SERVERLESS READY FILES:
/api/registrations.js       ← Pure handler (no Express)
/api/bulk-send.js           ← Pure handler (no Express)
/backend/utils/dbConnect.js ← Cached MongoDB
/backend/utils/generateODLetter.js ← Returns Buffer
/backend/controllers/emailController.js ← Accepts buffers

❌ LOCAL DEV ONLY:
/backend/server.js          ← Express server (not used on Vercel)
/backend/routes/*           ← Express routes (not used on Vercel)
/backend/controllers/registrationController.js ← Only for local routes
```

---

## 🎯 API Endpoints

### Register User
```bash
POST /api/registrations
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "Hackathon",
  "eventDate": "February 2nd, 2026"
}
```

### Bulk Send
```bash
POST /api/bulk-send
```

---

## 🔧 Environment Variables

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/magnus
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🚨 Common Issues

### "MongoDB connection failed"
→ Check `MONGO_URI` format and IP whitelist (0.0.0.0/0)

### "Email sending failed"  
→ Use Gmail App Password, not regular password

### "Cannot find module"  
→ Run `npm install` in `/backend` directory

### "Function timeout"  
→ `/api/bulk-send` processes max 50 users (Vercel 10s limit)

---

## 📊 What Happens on Registration?

1. ✅ User data saved to MongoDB
2. ✅ Unique QR code generated (JSON payload)
3. ✅ OD Letter PDF created (Buffer in memory)
4. ✅ Email sent with PDF + QR attachments
5. ✅ Database updated with `emailSent: true`

---

## 🎓 Email Contents

Each user receives:
- 📄 **OD Letter PDF** (with CIT + Magnus logos)
- 🎟️ **QR Code** (for event check-in)
- 📧 **Instructions** (print OD, bring QR, 8:00 AM start)

---

## 📝 Next Steps After Deployment

1. Test registration endpoint with real email
2. Verify email received with PDF + QR
3. Test `/api/bulk-send` with pending users
4. Monitor Vercel function logs
5. Check MongoDB Atlas for new records

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Gmail App Passwords:** https://myaccount.google.com/apppasswords

---

**Need Help?** Contact: magnus@citchennai.net
