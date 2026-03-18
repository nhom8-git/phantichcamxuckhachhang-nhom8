# AI Customer Sentiment Analyzer

## Mô tả dự án

Đây là một công cụ đơn giản để phân tích cảm xúc (tích cực/tiêu cực/trung lập) từ các đoạn văn bản phản hồi của khách hàng. Ứng dụng sử dụng AI (OpenAI GPT-3.5-turbo) để phân tích và hiển thị kết quả một cách trực quan.

## Tính năng

- Phân tích cảm xúc từ văn bản tiếng Việt
- Giao diện người dùng thân thiện và responsive
- Hiển thị kết quả với màu sắc trực quan
- Xử lý lỗi và loading state
- Tối giản và dễ sử dụng

## Công nghệ sử dụng

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **AI Service**: OpenAI API (GPT-3.5-turbo)
- **Styling**: Custom CSS với Font Awesome icons
- **Deployment**: Vercel
- **Containerization**: Docker

## Cài đặt và chạy

### Yêu cầu
- Trình duyệt web hiện đại
- Kết nối internet (để gọi API OpenAI)

### Hướng dẫn chạy local

1. Clone repository này
2. Mở `index.html` trong trình duyệt

### Thiết lập API Key

1. Đăng ký tài khoản OpenAI tại [https://platform.openai.com/](https://platform.openai.com/)
2. Lấy API Key từ dashboard
3. Mở file `script.js` và thay thế `'YOUR_OPENAI_API_KEY_HERE'` bằng API key thật của bạn

**Lưu ý bảo mật**: Việc nhúng API key trực tiếp vào mã nguồn client-side như vậy chỉ dành cho mục đích trình bày và kiểm tra trong bài tập. Trong môi trường production thực tế, API key nên được bảo mật qua server-side proxy.

## Sử dụng

1. Nhập phản hồi của khách hàng vào textarea
2. Nhấn nút "Analyze Sentiment"
3. Xem kết quả phân tích hiển thị với màu sắc tương ứng

## Quản lý mã nguồn với Git & GitHub

1. **Khởi tạo repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial setup"
   ```

2. **Tạo repository trên GitHub** và push:
   ```bash
   git remote add origin https://github.com/your-username/sentiment-analyzer.git
   git push -u origin main
   ```

3. **Lịch sử commit mẫu**:
   - "Initial setup"
   - "Add AI integration with OpenAI API"
   - "Implement responsive UI"
   - "Add error handling and loading states"
   - "Create Dockerfile for containerization"

## Deployment

### Vercel
1. Đăng ký tài khoản Vercel tại [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Deploy automatically
4. Link Vercel: [Thay thế bằng link thực tế sau khi deploy]

### Docker

1. Build image:
   ```bash
   docker build -t sentiment-analyzer .
   ```

2. Run container:
   ```bash
   docker run -p 8080:80 sentiment-analyzer
   ```

3. Truy cập: http://localhost:8080

## Cấu trúc dự án

```
├── index.html          # Giao diện chính
├── style.css           # Styling
├── script.js           # Logic JavaScript
├── Dockerfile          # Docker configuration
└── README.md           # Tài liệu này
```

## API Reference

Ứng dụng sử dụng OpenAI Chat Completions API với prompt được thiết kế để phân tích cảm xúc và trả về JSON response.

## Lưu ý

- Đảm bảo API key OpenAI có đủ credit
- Ứng dụng chỉ hoạt động với kết nối internet
- Phân tích cảm xúc dựa trên AI, có thể không 100% chính xác

## Tác giả

[Thay thế bằng thông tin của bạn]

## License

MIT License

## Lưu ý về bảo mật API Key

Trong dự án này, API Key của dịch vụ AI được nhúng trực tiếp vào mã JavaScript phía client để phục vụ mục đích trình bày và kiểm tra bài tập.

Trong các hệ thống thực tế (production), việc nhúng API Key trực tiếp vào mã nguồn frontend là không an toàn vì có thể làm lộ thông tin bảo mật.

Trong môi trường chuyên nghiệp, API Key cần được lưu trữ ở phía backend (server) và không được công khai trong mã nguồn client-side.
