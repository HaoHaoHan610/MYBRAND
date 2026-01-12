# 🔧 Sửa Lỗi "Service Suspended" trên Render

## Vấn đề
Service trên Render bị suspend với thông báo: **"This service has been suspended by its owner"**

## Nguyên nhân
Render free tier tự động **suspend** service sau một thời gian không hoạt động để tiết kiệm tài nguyên.

---

## ✅ Cách Sửa: Resume Service

### Bước 1: Vào Dashboard Render
1. Đăng nhập [render.com](https://render.com)
2. Vào **Dashboard** → Tìm service của bạn (ví dụ: `mybrand-backend`)

### Bước 2: Resume Service
1. Click vào service của bạn
2. Tìm nút **"Resume"** hoặc **"Restore"** (thường ở góc trên bên phải)
3. Click **"Resume"**
4. Đợi 2-3 phút để service khởi động lại

### Bước 3: Kiểm tra
- Mở URL backend (ví dụ: `https://mybrand-4wql.onrender.com`)
- Nếu thấy `<h1>Khanh bu cu</h1>` → ✅ Service đã chạy lại!

---

## 🔑 Cấu hình Environment Variables (QUAN TRỌNG)

Backend của bạn cần các API keys sau để hoạt động:

### Bước 1: Vào tab "Environment"
1. Trong service của bạn trên Render
2. Click tab **"Environment"** (bên trái)

### Bước 2: Thêm các biến sau:

| Key | Mô tả | Ví dụ |
|-----|-------|-------|
| `OPENAI_API_KEY` | API key từ OpenAI | `sk-...` |
| `GEMINI_API_KEY` | API key từ Google Gemini | `AIza...` |
| `FIRECRAWL_API_KEY` | API key từ Firecrawl (nếu dùng) | `fc-...` |

### Bước 3: Lưu và Redeploy
1. Click **"Save Changes"**
2. Service sẽ tự động redeploy
3. Đợi deploy xong (khoảng 5 phút)

---

## 🚨 Nếu không có nút Resume

### Option 1: Tạo Service mới
1. **Xóa service cũ** (nếu muốn)
2. Tạo **Web Service mới** với cấu hình:
   - **Root Directory**: `src/FLASKAPI`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**: Thêm các keys ở trên

### Option 2: Upgrade lên Paid Plan
- Render free tier có giới hạn suspend
- Paid plan ($7/tháng) không bị suspend

---

## 📝 Checklist Deploy Backend

- [ ] Code đã push lên GitHub
- [ ] Root Directory: `src/FLASKAPI`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn app:app`
- [ ] Environment Variables đã thêm:
  - [ ] `OPENAI_API_KEY`
  - [ ] `GEMINI_API_KEY`
  - [ ] `FIRECRAWL_API_KEY` (nếu cần)
- [ ] Service đã Resume/Restore
- [ ] Test URL backend hoạt động

---

## 🔄 Để tránh bị suspend

1. **Sử dụng Render Cron Jobs** để ping service mỗi 5 phút
2. **Upgrade lên Paid Plan** ($7/tháng)
3. **Dùng dịch vụ khác**: Railway, Fly.io (có free tier tốt hơn)

---

## 💡 Tip: Tạo Health Check Endpoint

Thêm vào `app.py`:
```python
@app.route('/health')
def health():
    return jsonify({"status": "ok"}), 200
```

Sau đó dùng [UptimeRobot](https://uptimerobot.com) (free) để ping `/health` mỗi 5 phút → Service sẽ không bị suspend!

