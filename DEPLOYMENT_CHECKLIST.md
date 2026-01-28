# ✅ DEPLOYMENT CHECKLIST

Use this checklist to ensure everything is ready before going live.

---

## 📋 PRE-DEPLOYMENT SETUP (Do Once)

### MongoDB Atlas
- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created with strong password
- [ ] IP Whitelist includes `0.0.0.0/0` (or Vercel IP range)
- [ ] Connection string copied: `mongodb+srv://user:pass@...`
- [ ] MONGO_URI saved securely

### Gmail Setup
- [ ] Gmail account has 2FA enabled
- [ ] App Password generated (not regular password)
- [ ] Email address: `your_email@gmail.com`
- [ ] App Password: `xxxx xxxx xxxx xxxx`
- [ ] EMAIL_USER and EMAIL_PASS saved securely

### Assets
- [ ] File: `backend/assets/cit-logo.png` exists
- [ ] File: `backend/assets/magnus-logo.png` exists
- [ ] File: `backend/assets/hod-sign.png` exists
- [ ] All files are readable
- [ ] File sizes reasonable (<500KB each)

### Local Repository
- [ ] Git repository initialized
- [ ] All changes committed
- [ ] `.env` file NOT committed (in .gitignore)
- [ ] Node_modules NOT committed
- [ ] `vercel.json` committed

---

## 🧪 LOCAL TESTING (Test Locally First)

### Installation
- [ ] `npm install` completed in `/backend`
- [ ] All dependencies installed successfully
- [ ] No error messages during install

### Configuration
- [ ] `.env` file created in `/backend`
- [ ] MONGO_URI set in `.env`
- [ ] EMAIL_USER set in `.env`
- [ ] EMAIL_PASS set in `.env`
- [ ] File permissions correct (readable)

### Server Start
- [ ] `npm start` command works
- [ ] No console errors on startup
- [ ] "Server running on port 5000" message
- [ ] Database connection successful

### Endpoint Testing
- [ ] POST /api/registrations with valid data works
- [ ] Receives 201 response
- [ ] User appears in MongoDB
- [ ] Email received with PDF + QR
- [ ] POST /api/registrations with missing email returns 400
- [ ] POST /api/bulk-send works
- [ ] Response shows sent/failed counts

### Email Verification
- [ ] Email arrived within 5 seconds
- [ ] OD Letter PDF attached and readable
- [ ] QR Code PNG attached
- [ ] CIT logo visible in PDF (top-left)
- [ ] Magnus logo visible in PDF (top-right)
- [ ] Student name correct in PDF
- [ ] Event details correct

---

## 📦 DEPLOYMENT TO VERCEL

### Vercel Setup
- [ ] Vercel account created at vercel.com
- [ ] Vercel CLI installed: `npm i -g vercel`
- [ ] Logged in: `vercel login`
- [ ] Project folder ready

### Deployment
- [ ] All changes committed to Git
- [ ] No uncommitted files in repo
- [ ] Run: `vercel` (links project)
- [ ] Deployment completes successfully
- [ ] No build errors
- [ ] Project URL received (e.g., https://your-project.vercel.app)

### Environment Variables
- [ ] Set MONGO_URI on Vercel
  ```bash
  vercel env add MONGO_URI
  vercel env add MONGO_URI --environment=production
  ```
- [ ] Set EMAIL_USER on Vercel
  ```bash
  vercel env add EMAIL_USER
  vercel env add EMAIL_USER --environment=production
  ```
- [ ] Set EMAIL_PASS on Vercel
  ```bash
  vercel env add EMAIL_PASS
  vercel env add EMAIL_PASS --environment=production
  ```

### Production Deployment
- [ ] Confirmed all env vars set
- [ ] Run: `vercel --prod`
- [ ] Production deployment successful
- [ ] Vercel dashboard shows functions deployed
- [ ] No deployment errors

---

## 🧪 PRODUCTION TESTING

### API Availability
- [ ] Endpoint reachable: `https://your-project.vercel.app`
- [ ] Health check responds: curl endpoint
- [ ] No 404 or 500 errors
- [ ] Response headers correct

### Registration Endpoint
- [ ] POST /api/registrations works
- [ ] Test with valid data
- [ ] Receives 201 response
- [ ] Response JSON valid
- [ ] User in MongoDB
- [ ] Email sent successfully

### Email Delivery
- [ ] Email received within 10 seconds
- [ ] All attachments present
- [ ] PDF readable
- [ ] QR code visible
- [ ] No email bounces

### Bulk Send Endpoint
- [ ] POST /api/bulk-send works
- [ ] Finds pending users
- [ ] Sends emails successfully
- [ ] Updates database
- [ ] Returns correct counts

### Error Handling
- [ ] Invalid email returns 400
- [ ] Missing fields returns 400
- [ ] Wrong method returns 405
- [ ] Errors are logged
- [ ] No stack traces in response

---

## 📊 MONITORING & VALIDATION

### Vercel Dashboard
- [ ] Functions tab shows deployed functions
- [ ] Logs show requests coming in
- [ ] No errors or warnings
- [ ] Duration reasonable (~1-4 seconds)
- [ ] Cold starts tracked

### MongoDB Atlas
- [ ] New documents appearing
- [ ] emailSent flags updating correctly
- [ ] Timestamps recording properly
- [ ] No connection errors
- [ ] Connection count reasonable

### Email Service
- [ ] Gmail sending emails successfully
- [ ] No bounce-backs
- [ ] Rate limiting working (1 per second)
- [ ] Bulk send completing without errors

---

## 📝 DOCUMENTATION

- [ ] QUICK_START.md reviewed
- [ ] SERVERLESS_DEPLOYMENT.md bookmarked
- [ ] DEVELOPMENT.md saved for reference
- [ ] API_DOCUMENTATION.md available to team
- [ ] Team has access to documentation
- [ ] Support contact provided

---

## 🔒 SECURITY VERIFICATION

- [ ] No credentials in code
- [ ] .env not in repository
- [ ] .gitignore includes .env
- [ ] Vercel env vars not visible
- [ ] MongoDB user has minimal permissions
- [ ] IP whitelist specific or 0.0.0.0/0
- [ ] Email domain configured properly
- [ ] CORS headers set correctly
- [ ] No sensitive data in logs
- [ ] Error messages don't expose system info

---

## 👥 TEAM NOTIFICATION

- [ ] Team notified of go-live
- [ ] Documentation sent to team
- [ ] Support process established
- [ ] Escalation path clear
- [ ] On-call person assigned
- [ ] Contact info shared

---

## 📞 POST-DEPLOYMENT SUPPORT

### Monitoring
- [ ] Set up error alerts (Vercel/Slack)
- [ ] Daily logs check for first week
- [ ] Response time monitoring
- [ ] Email delivery rate tracking
- [ ] Database performance tracking

### Issue Response
- [ ] Know how to check Vercel logs
- [ ] Know how to check MongoDB logs
- [ ] Know how to restart functions
- [ ] Know how to redeploy if needed
- [ ] Know who to contact for each issue

### Documentation Updates
- [ ] Keep docs updated with any changes
- [ ] Document any issues and solutions
- [ ] Add troubleshooting as needed
- [ ] Version control for docs

---

## 🎉 GO-LIVE SIGN-OFF

**Deployment Manager:** _________________ **Date:** _______

**Technical Lead:** _________________ **Date:** _______

**Product Owner:** _________________ **Date:** _______

---

## 📋 POST-DEPLOYMENT (First Week)

### Daily Check
- [ ] Day 1: Monitor for errors
- [ ] Day 2: Check email delivery rate
- [ ] Day 3: Verify database growth
- [ ] Day 4: Check performance metrics
- [ ] Day 5: Review logs for issues

### Weekly Review
- [ ] User feedback collected
- [ ] Issue log reviewed
- [ ] Performance metrics analyzed
- [ ] Optimization opportunities identified
- [ ] Next improvements planned

---

## 🚨 ROLLBACK PROCEDURE (If Needed)

If major issues occur:

1. [ ] Identify the problem
2. [ ] Document the error
3. [ ] Revert to previous Vercel deployment
   ```bash
   vercel deployments
   # Find previous deployment
   vercel alias set <deployment-url> your-project
   ```
4. [ ] Notify team
5. [ ] Investigate root cause
6. [ ] Fix and test locally
7. [ ] Redeploy

---

## 📞 QUICK REFERENCE

### Important URLs
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- Gmail Settings: https://myaccount.google.com
- Project URL: https://your-project.vercel.app

### Important Commands
```bash
# Check deployment status
vercel --list

# View logs
vercel logs your-project

# Rollback
vercel alias set <previous-url> your-project

# Redeploy
vercel --prod

# Set env var
vercel env add VARIABLE_NAME
```

### Important Contacts
- MongoDB Support: support@mongodb.com
- Vercel Support: support@vercel.com
- Gmail Help: support.google.com
- Team Magnus: magnus@citchennai.net

---

## ✅ ALL SYSTEMS GO!

Once all items are checked:

✨ **Your serverless backend is LIVE and READY!** ✨

---

**Deployment Date:** _________________

**Deployed By:** _________________

**Notes:** 
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Keep this checklist for future deployments and updates!**
