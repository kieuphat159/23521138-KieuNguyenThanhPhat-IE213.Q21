## Thông tin sinh viên
- **Họ tên**: Kiều Nguyễn Thành Phát
- **MSSV**: 23521138
- **Lớp**: IE213.Q21.1

## Môn học
- **IE213.Q21**

## Danh sách các lab
- **Lab 1**: Thực hành MongoDB (CRUD, query, update, aggregate) với collection `employees`.
- **Lab 2**: Thiết lập môi trường Node.js + khởi tạo backend Movie Reviews (Express + MongoDB Atlas + DAO + Controller).
- **Lab 3**: Thiết lập định tuyến + Controller + DAO cho review (POST/PUT/DELETE) trong backend Movie Reviews.
- **Lab 4**: Thiết lập frontend React cho Movie Reviews (Navbar, components, routing, localStorage).
- **Lab 5**: Kết nối frontend React tới backend bằng `axios`, xây dựng trang Movies / Movie / Review / Login và lọc theo title, rating.
## Lab 1
### Mô tả ngắn gọn
Thực hành các thao tác MongoDB trên collection `employees`: tạo dữ liệu, tạo index, truy vấn theo điều kiện, update theo điều kiện, và aggregate theo `organization`.

### Cách chạy / thực hiện
- Mở **MongoDB Shell** (`mongosh`) và chọn DB làm việc (theo các ảnh trong `lab1/README.md`).

### Kết quả thực hiện
- **Ảnh minh hoạ/output**: `lab1/README.md`

### Hoàn thành / chưa hoàn thành
- **Đã hoàn thành**: 2.1 → 2.10 (theo `lab1/script.md` và ảnh trong `lab1/README.md`).
- **Chưa hoàn thành**: (không).

## Lab 2
### Mô tả ngắn gọn
Thiết lập môi trường Node.js, cài dependencies và `nodemon`, sau đó khởi tạo backend minh hoạ Movie Reviews theo kiến trúc:
Router → Controller → DAO → MongoDB (Atlas/sample dataset `sample_mflix`).

### Cách chạy chương trình
1) Vào thư mục lab:

```bash
cd lab02
npm install
```

2) Tạo/cập nhật biến môi trường:
- Tạo file `lab02/backend/.env` (hoặc copy từ `lab02/.env.example`) và điền:
  - `MOVIEREVIEWS_DB_URI=...`
  - `MOVIEREVIEWS_NS=sample_mflix`
  - `PORT=3000`

3) Chạy server:

```bash
npm run dev
```

4) Test API:
- `GET http://localhost:3000/api/v1/movies/`
- `GET http://localhost:3000/api/v1/movies/?moviesPerPage=1&page=0`

### Kết quả thực hiện
- **Thiết lập môi trường (Bài 1)**: đã cài `mongodb`, `express`, `cors`, `dotenv`, và `nodemon`.
- **Backend (Bài 2)**:
  - `backend/server.js`: khởi tạo Express + middleware + mount route + 404
  - `backend/index.js`: kết nối MongoDB Atlas, gọi `MoviesDAO.injectDB()`, chạy server
  - `backend/api/movies.route.js`: định tuyến `/api/v1/movies`
  - `backend/api/movies.controller.js`: `apiGetMovies` trả JSON
  - `backend/dao/moviesDAO.js`: `injectDB`, `getMovies`

### Hình ảnh minh hoạ / output
- **Kiểm tra Node.js version**: `lab02/img/node-version.png`

### Hoàn thành / chưa hoàn thành
- **Đã hoàn thành**:
  - Bài 1: 1.1 → 1.6
  - Bài 2: 2.1 → 2.7
- **Chưa hoàn thành**: Không

## Lab 3
### Mô tả ngắn gọn
Thiết lập định tuyến cho các thao tác `review` trong ứng dụng minh hoạ Movie Reviews:
Router → `ReviewsController` → `ReviewsDAO` → MongoDB (collection `reviews`).

### Cách chạy chương trình
1) Vào thư mục lab:

```bash
cd Lab03
npm install
```

2) Chạy server:

```bash
npm run dev
```

3) Test API (endpoint cuối: `/review`):
- `POST http://localhost:3000/api/v1/movies/review`
- `PUT http://localhost:3000/api/v1/movies/review`
- `DELETE http://localhost:3000/api/v1/movies/review`

### Kết quả thực hiện
- Đã triển khai route `/api/v1/movies/review` với đủ `POST/PUT/DELETE`.
- Đã tạo:
  - `backend/api/reviews.controller.js`: xử lý request body và trả JSON `success`.
  - `backend/dao/reviewsDAO.js`: thao tác `insertOne`, `updateOne`, `deleteOne` trên collection `reviews`.
  - `backend/index.js`: injectDB cho `ReviewsDAO` sau khi kết nối MongoDB.

### Hình ảnh minh hoạ / output
- **Kiểm tra Node.js version**: `Lab03/img/node-version.png`

### Hoàn thành / chưa hoàn thành
- **Đã hoàn thành**:
  - Bài 1 (routing): 1.1 → 1.4 cho `/review`
  - Bài 2 (controller + gọi DAO): 2.1 → 2.5
  - Bài 3 (DAO + injectDB + ObjectId): 3.1 → 3.5
- **Chưa hoàn thành**: không


## Lab 4
### Mô tả ngắn gọn
Thiết lập frontend React cho ứng dụng Movie Reviews: scaffold app, tạo các component, thiết lập navbar và định tuyến, sử dụng `localStorage` để lưu movies và reviews mẫu.

### Cách chạy chương trình
1) Vào thư mục frontend:

```bash
cd Lab04/frontend
npm install
```

2) Chạy app:

```bash
npm start
```

### Các nội dung đã triển khai
- Bài 1: Tạo template frontend React trong `Lab04/frontend`, cài `bootstrap`, `react-router-dom`, `react-bootstrap`.
- Bài 2: Triển khai các component trong `Lab04/frontend/src/components/`: `movies-list.js`, `movie.js`, `add-review.js`, `login.js`. `App.js` chứa Navbar React-Bootstrap, logo **Movie Reviews**, link **Movies**, và trạng thái **Login/Logout** quản lý bằng `useState`.
- Bài 3: Thiết lập định tuyến bằng `Switch` / `Route` của `react-router-dom` v5 cho đường dẫn `/`, `/movies/:id`, `/movies/:id/review`, `/login`.

### Hoàn thành / chưa hoàn thành
- **Đã hoàn thành**: Bài 1 → Bài 3 (frontend cơ bản hoạt động, lưu dữ liệu mẫu vào `localStorage`).
- **Chưa hoàn thành**: Không

## Lab 5
### Mô tả ngắn gọn
Kết nối frontend React tới backend Movie Reviews bằng `axios`, tạo `MovieDataService`, hiển thị danh sách phim, xem chi tiết phim, thêm/sửa/xoá review và đăng nhập người dùng tạm thời.

### Cách chạy chương trình
1) Vào thư mục frontend:

```bash
cd Lab05/frontend
npm install
```

2) Chạy app:

```bash
npm start
```

3) Nếu backend chạy ở URL khác, cấu hình `REACT_APP_API_BASE_URL` trước khi chạy app.

### Các nội dung đã triển khai
- Bài 1: Cài `axios`, tạo `MovieDataService` trong `Lab05/frontend/src/services/movies.js` với các hàm `getAll`, `get`, `find`, `createReview`, `updateReview`, `deleteReview`, `getRatings`.
- Bài 2: Xây dựng `MoviesList` với `useState`, `useEffect`, form tìm theo title / rating và hiển thị movie bằng `Card`.
- Bài 3: Xây dựng trang `Movie` để xem chi tiết, danh sách review, link thêm review và hiển thị thời gian bằng `moment`.
- Bài 4: Bổ sung `AddReview` và `Login` để hoàn chỉnh luồng thêm/sửa/xoá review.

### Hoàn thành / chưa hoàn thành
- **Đã hoàn thành**: Bài 1 → Bài 4.
- **Chưa hoàn thành**: Không