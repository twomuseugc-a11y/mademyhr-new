# madebyhr

```powershell
Set-Location "c:\Users\HOME\Desktop\123456\mademyhr-new"
```

```powershell
npm install
```

```powershell
@'
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password
'@ | Set-Content .env.local
```

```powershell
npm run dev
```

```powershell
npm run build
npm run start
```

```powershell
Remove-Item -Recurse -Force node_modules, .next, out, coverage, .vercel -ErrorAction SilentlyContinue
Remove-Item -Force *.tsbuildinfo, npm-debug.log*, yarn-debug.log*, yarn-error.log*, .pnpm-debug.log* -ErrorAction SilentlyContinue
```

```powershell
powershell -ExecutionPolicy Bypass -File .\prepare-zip.ps1 -KeepEnv
```

```text
Open http://localhost:3000 after npm run dev
```

```text
Keep these folders in the zip:
app
components
features
hooks
lib
models
public
```

```text
Delete these before zipping if you do not want them in the archive:
node_modules
.next
out
coverage
.vercel
*.tsbuildinfo
*.log
.env.local if you want to exclude secrets
```
