# Trang Bìa (Cover Page) Component

Component React chuyên nghiệp để tạo trang bìa cho bài làm nhóm, báo cáo, đồ án.

## Cách sử dụng

### 1. Import component

```tsx
import { CoverPage } from "./components/cover-page";
```

### 2. Sử dụng component

```tsx
<CoverPage
  title="TÊN BÀI / TÊN ĐỒ ÁN"
  subject="Tên môn học"
  className="Lớp 01"
  instructor="Tên giảng viên"
  groupNumber={5}
  members={[
    {
      name: "Họ và tên",
      studentId: "MSSV",
      role: "Vai trò",
      email: "email@example.com" // Optional
    },
    // ... thêm các thành viên khác
  ]}
  groupPhotos={["/path/to/photo1.jpg", "/path/to/photo2.jpg"]} // Optional
  school="Tên trường"
  department="Tên khoa"
  submissionDate="08 tháng 1, 2026" // Optional, mặc định là ngày hiện tại
/>
```

## Props

| Prop | Type | Required | Mô tả |
|------|------|----------|-------|
| `title` | string | ✅ | Tiêu đề lớn của bài làm/đồ án |
| `subject` | string | ✅ | Tên môn học |
| `className` | string | ✅ | Tên lớp |
| `instructor` | string | ✅ | Tên giảng viên |
| `groupNumber` | number | ✅ | Số nhóm |
| `members` | GroupMember[] | ✅ | Danh sách thành viên nhóm |
| `groupPhotos` | string[] | ❌ | Mảng URL ảnh nhóm (1-5 ảnh) |
| `school` | string | ❌ | Tên trường (mặc định: "Trường Đại Học") |
| `department` | string | ❌ | Tên khoa (mặc định: "Khoa Công Nghệ Thông Tin") |
| `submissionDate` | string | ❌ | Ngày nộp (mặc định: ngày hiện tại) |

### GroupMember Interface

```tsx
interface GroupMember {
  name: string;        // Họ và tên
  studentId: string;   // Mã số sinh viên
  role: string;        // Vai trò (Nhóm trưởng, Thành viên, etc.)
  email?: string;      // Email (tùy chọn)
}
```

## Tính năng

✅ **Bố cục 2 cột**: Thông tin nhóm bên trái, ảnh nhóm bên phải  
✅ **Bảng thành viên**: Hiển thị Họ tên, MSSV, Vai trò, Email  
✅ **Ảnh nhóm**: Hỗ trợ 1-5 ảnh, tự động grid layout  
✅ **Placeholder ảnh**: Hiển thị placeholder nếu chưa có ảnh  
✅ **Responsive**: Tự động điều chỉnh trên mobile  
✅ **Print-friendly**: Tối ưu cho in ấn với CSS print media  
✅ **Styling chuyên nghiệp**: Màu sắc tối giản, font rõ ràng  

## Ví dụ sử dụng

Xem file `cover-page-demo.tsx` để xem ví dụ đầy đủ.

## In ấn

Component đã được tối ưu cho in ấn. Sử dụng `Ctrl+P` (Windows) hoặc `Cmd+P` (Mac) để in trang bìa.

## Tùy chỉnh

Bạn có thể tùy chỉnh màu sắc và styling bằng cách:
1. Sửa trực tiếp trong file `cover-page.tsx`
2. Thêm custom CSS classes
3. Override Tailwind classes


