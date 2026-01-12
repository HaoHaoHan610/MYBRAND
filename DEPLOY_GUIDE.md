# 🚀 Hướng Dẫn Deploy Website

## Tổng quan
- **Backend (Flask API)**: Deploy lên **Render** (free)
- **Frontend (React/Vite)**: Deploy lên **Vercel** (free)

---

## 📋 Bước 1: Chuẩn bị GitHub Repository

1. **Đảm bảo code đã được push lên GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Kiểm tra cấu trúc repo:**
   - Backend nằm trong: `src/FLASKAPI/`
   - Frontend nằm trong: `FE/`

---

## 🔧 Bước 2: Deploy Backend lên Render

### 2.1. Tạo tài khoản Render
1. Vào [https://render.com](https://render.com)
2. Đăng ký/Đăng nhập bằng GitHub

### 2.2. Tạo Web Service mới
1. Click **"New +"** → Chọn **"Web Service"**
2. Chọn repository **MYBRAND** của bạn
3. Điền thông tin:
   - **Name**: `mybrand-backend` (hoặc tên bạn muốn)
   - **Region**: Chọn gần nhất (Singapore hoặc US)
   - **Branch**: `main`
   - **Root Directory**: `src/FLASKAPI` ⚠️ **QUAN TRỌNG**
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

### 2.3. Cấu hình Environment Variables (nếu cần)
Nếu backend cần API keys (OpenAI, Anthropic, etc.):
- Vào tab **"Environment"**
- Thêm các biến như: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.

### 2.4. Deploy
1. Click **"Create Web Service"**
2. Đợi build và deploy (khoảng 5-10 phút)
3. Khi thành công, bạn sẽ có URL dạng: `https://mybrand-backend.onrender.com`
4. **Lưu lại URL này** để dùng cho frontend! 📝

### 2.5. Kiểm tra Backend
- Mở URL backend trong trình duyệt
- Nếu thấy `<h1>Khanh bu cu</h1>` → Backend đã chạy thành công! ✅

---

## 🎨 Bước 3: Deploy Frontend lên Vercel

### 3.1. Tạo tài khoản Vercel
1. Vào [https://vercel.com](https://vercel.com)
2. Đăng ký/Đăng nhập bằng GitHub

### 3.2. Tạo Project mới
1. Click **"Add New..."** → **"Project"**
2. Chọn repository **MYBRAND** của bạn
3. Điền thông tin:
   - **Framework Preset**: Vite (tự động nhận diện)
   - **Root Directory**: `FE` ⚠️ **QUAN TRỌNG**
   - **Build Command**: `npm run build` (mặc định)
   - **Output Directory**: `dist` (mặc định)
   - **Install Command**: `npm install` (mặc định)

### 3.3. Cấu hình Environment Variables
1. Vào tab **"Environment Variables"**
2. Thêm biến:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: URL backend của bạn (ví dụ: `https://mybrand-backend.onrender.com`)
   - **Environment**: Production, Preview, Development (chọn cả 3)

### 3.4. Deploy
1. Click **"Deploy"**
2. Đợi build và deploy (khoảng 2-5 phút)
3. Khi thành công, bạn sẽ có URL dạng: `https://mybrand-ai-agent.vercel.app`
4. **Đây là URL website của bạn!** 🎉

---

## ✅ Bước 4: Kiểm tra Website

1. **Mở URL frontend** trong trình duyệt
2. **Điền form** và nhấn "Phân tích hồ sơ"
3. **Kiểm tra xem có gọi API thành công không**

### Nếu gặp lỗi CORS:
- Backend đã có `flask-cors` và cấu hình CORS rồi, nhưng nếu vẫn lỗi:
- Kiểm tra lại file `src/FLASKAPI/app.py` có dòng:
  ```python
  CORS(app, resources={r"/*": {"origins": "*"}})
  ```

---

## 🔄 Cập nhật Code sau này

### Backend:
1. Sửa code trong `src/FLASKAPI/`
2. Commit và push lên GitHub
3. Render sẽ tự động deploy lại

### Frontend:
1. Sửa code trong `FE/`
2. Commit và push lên GitHub
3. Vercel sẽ tự động deploy lại

---

## 🐛 Troubleshooting

### Backend không chạy được:
- ✅ Kiểm tra **Root Directory** phải là `src/FLASKAPI`
- ✅ Kiểm tra **Start Command** phải là `gunicorn app:app`
- ✅ Kiểm tra file `requirements.txt` có trong `src/FLASKAPI/`
- ✅ Kiểm tra file `app.py` có dòng `app = create_app()` ở cấp module

### Frontend không gọi được API:
- ✅ Kiểm tra **Environment Variable** `VITE_API_BASE_URL` trên Vercel
- ✅ Kiểm tra URL backend có đúng không
- ✅ Mở Developer Tools (F12) → Network tab để xem lỗi chi tiết

### Lỗi 404 hoặc 500:
- ✅ Kiểm tra logs trên Render/Vercel
- ✅ Kiểm tra backend có chạy không (mở URL backend trực tiếp)

---

## 📞 Cần hỗ trợ?

Nếu gặp lỗi, chụp screenshot log và gửi lại để được hỗ trợ!

