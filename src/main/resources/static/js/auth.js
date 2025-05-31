document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Giả lập check đăng nhập
  if(email === 'user@example.com' && password === '123456') {
    const user = {
      name: 'Người dùng',
      avatar: 'user-avatar.png'
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Đăng nhập thành công!');
    window.location.href = 'index.html';  // chuyển về trang chủ
  } else {
    alert('Sai email hoặc mật khẩu!');
  }
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');

  // Xóa thông báo lỗi cũ
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';

  // Vô hiệu hóa nút để tránh gửi nhiều lần
  loginBtn.disabled = true;
  loginBtn.textContent = 'Đang xử lý...';

  // Danh sách admin hard-code (mô phỏng bảng admins)
  const admins = [
    { id: 1, name: "Quản trị viên 1", email: "admin1@example.com", password: "admin123" },
    { id: 2, name: "Quản trị viên 2", email: "admin2@example.com", password: "admin456" }
  ];

  // Kiểm tra email
  const admin = admins.find(a => a.email === email);
  if (!admin) {
    errorMessage.textContent = 'Email không tồn tại!';
    errorMessage.style.display = 'block';
    loginBtn.disabled = false;
    loginBtn.textContent = 'Đăng nhập';
    return;
  }

  // Kiểm tra mật khẩu (tạm thời dùng plain-text)
  if (admin.password === password) {
    // Lưu thông tin admin vào localStorage
    const adminSession = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'admin'
    };
    localStorage.setItem('admin', JSON.stringify(adminSession));
    alert('Đăng nhập quản trị viên thành công!');
    window.location.href = 'admin.html'; // Chuyển hướng đến dashboard
  } else {
    errorMessage.textContent = 'Mật khẩu không đúng!';
    errorMessage.style.display = 'block';
    loginBtn.disabled = false;
    loginBtn.textContent = 'Đăng nhập';
  }
});
