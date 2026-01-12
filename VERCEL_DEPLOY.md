# 🎨 Hướng Dẫn Deploy Frontend lên Vercel

## Vấn đề
Bạn không thấy giao diện frontend vì **chưa deploy frontend lên Vercel**.

---

## ✅ Bước 1: Chuẩn bị Code

1. **Đảm bảo code đã push lên GitHub:**
   ```bash
   git add .
   git commit -m "Prepare frontend for Vercel"
   git push origin main
   ```

---

## 🚀 Bước 2: Deploy lên Vercel

### 2.1. Tạo tài khoản Vercel
1. Vào [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Chọn **"Continue with GitHub"**
3. Authorize Vercel truy cập GitHub của bạn

### 2.2. Tạo Project mới
1. Sau khi đăng nhập, click **"Add New..."** → **"Project"**
2. Tìm và chọn repository **MYBRAND** của bạn
3. Click **"Import"**

### 2.3. Cấu hình Project ⚠️ QUAN TRỌNG

**Framework Preset:**
- Vercel sẽ tự nhận diện là **Vite** → Giữ nguyên

**Root Directory:**
- Click **"Edit"** bên cạnh "Root Directory"
- Chọn **`FE`** (thư mục chứa frontend)
- Click **"Continue"**

**Build Settings:**
- **Build Command**: `npm run build` (mặc định)
- **Output Directory**: `dist` (mặc định)
- **Install Command**: `npm install` (mặc định)

### 2.4. Cấu hình Environment Variables 🔑 QUAN TRỌNG

1. Scroll xuống phần **"Environment Variables"**
2. Click **"Add"** để thêm biến mới:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: URL backend của bạn trên Render
     - Ví dụ: `https://mybrand-4wql.onrender.com`
     - ⚠️ **KHÔNG có dấu `/` ở cuối!**
   - **Environment**: Chọn cả 3:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
3. Click **"Save"**

### 2.5. Deploy
1. Click nút **"Deploy"** (màu xanh, góc dưới bên phải)
2. Đợi build và deploy (khoảng 2-5 phút)
3. Khi thành công, bạn sẽ thấy:
   - ✅ **"Congratulations! Your project has been deployed"**
   - URL của bạn: `https://mybrand-ai-agent.vercel.app` (hoặc tên khác)

---

## ✅ Bước 3: Kiểm tra Website

1. **Mở URL Vercel** trong trình duyệt
2. **Bạn sẽ thấy giao diện frontend!** 🎉
3. **Điền form** và test xem có gọi API được không

---

## 🔧 Troubleshooting

### Frontend không hiển thị:
- ✅ Kiểm tra **Root Directory** phải là `FE`
- ✅ Kiểm tra **Build Command** phải là `npm run build`
- ✅ Kiểm tra **Output Directory** phải là `dist`
- ✅ Xem **Build Logs** trên Vercel để tìm lỗi

### Frontend không gọi được API:
- ✅ Kiểm tra **Environment Variable** `VITE_API_BASE_URL` đã thêm chưa
- ✅ Kiểm tra URL backend có đúng không (không có `/` ở cuối)
- ✅ Kiểm tra backend đã Resume và chạy chưa
- ✅ Mở **Developer Tools (F12)** → **Network tab** để xem lỗi chi tiết

### Lỗi Build:
- ✅ Kiểm tra `package.json` có đầy đủ dependencies không
- ✅ Xem **Build Logs** trên Vercel để biết lỗi cụ thể
- ✅ Thử chạy `npm install` và `npm run build` ở local trước

---

## 📝 Checklist Deploy Frontend

- [ ] Code đã push lên GitHub
- [ ] Đã tạo project trên Vercel
- [ ] Root Directory: `FE`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variable đã thêm:
  - [ ] `VITE_API_BASE_URL` = URL backend Render
- [ ] Deploy thành công
- [ ] Test website hoạt động

---

## 🔄 Cập nhật Code sau này

1. Sửa code trong `FE/`
2. Commit và push lên GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   ```
3. **Vercel sẽ tự động deploy lại** (auto-deploy)
4. Đợi vài phút → Website tự động cập nhật!

---

## 💡 Tip: Custom Domain

Nếu muốn dùng domain riêng:
1. Vào **Settings** → **Domains**
2. Thêm domain của bạn
3. Follow hướng dẫn để cấu hình DNS

---

## 📞 Cần hỗ trợ?

Nếu gặp lỗi:
1. Chụp screenshot **Build Logs** trên Vercel
2. Chụp screenshot **Environment Variables**
3. Gửi lại để được hỗ trợ!

