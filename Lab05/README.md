# Lab 5 - Frontend React Kết Nối Backend

## Mục tiêu
- Kết nối frontend React tới backend Movie Reviews bằng `axios`.
- Hoàn thiện `MoviesList`, `Movie`, `AddReview`, `Login` theo nội dung trong `lab5.md`.

## Cấu trúc đã tạo
- `Lab05/frontend/package.json`: React 17, `bootstrap`, `react-bootstrap`, `react-router-dom` v5, `axios`, `moment`.
- `Lab05/frontend/src/services/movies.js`: lớp `MovieDataService` với `getAll`, `get`, `find`, `createReview`, `updateReview`, `deleteReview`, `getRatings`.
- `Lab05/frontend/src/components/`: các component `movies-list.js`, `movie.js`, `add-review.js`, `login.js`.
- `Lab05/frontend/src/App.js`: navbar, routes, login state.

## Cách chạy
1) Vào thư mục frontend:

```bash
cd Lab05/frontend
npm install
```

2) Chạy app:

```bash
npm start
```

3) Nếu backend không chạy ở `http://localhost:3000/api/v1/movies`, đặt biến môi trường:

```bash
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1/movies
```

## Ghi chú
- Frontend hiển thị danh sách phim, lọc theo title / rating, xem reviews, thêm / sửa / xoá review.
- `App.js` dùng `Switch` / `Route` theo kiểu `react-router-dom` v5 để giữ đúng pattern của Lab04.