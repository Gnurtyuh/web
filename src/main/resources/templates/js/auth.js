// document.getElementById('loginForm').addEventListener('submit', function (e) {
//   e.preventDefault();
//
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//
//   // Giả lập check đăng nhập
//   if (email === 'user@example.com' && password === '123456') {
//     const user = {
//       name: 'Người dùng',
//       avatar: 'user-avatar.png'
//     };
//     localStorage.setItem('user', JSON.stringify(user));
//     alert('Đăng nhập thành công!');
//     window.location.href = 'index.html';  // chuyển về trang chủ
//   } else {
//     alert('Sai email hoặc mật khẩu!');
//   }
// });

//
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('loginForm');
//   const nameInput = document.getElementById('name');
//   const passwordInput = document.getElementById('password');
//   const loginBtn = document.getElementById('loginBtn');
//   const errorMessage = document.getElementById('errorMessage');
//
//   form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//
//     const name = nameInput.value.trim();
//     const password = passwordInput.value;
//
//     errorMessage.style.display = 'none';
//     errorMessage.textContent = '';
//     loginBtn.disabled = true;
//     loginBtn.textContent = 'Đang xử lý...';
//
//     try {
//       const response = await fetch('http://localhost:8080/CourseShop/public/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: name, password: password })
//       });
//
//       if (!response.ok) {
//         throw new Error('Đăng nhập thất bại!');
//       }
//
//       const data = await response.json();
//
//       if (data.authenticated && data.token) {
//         const token = data.token;
//         localStorage.setItem('token', token);
//
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const user = {
//           id: payload.id,
//           name: payload.sub,
//           role: payload.role || 'user'
//         };
//
//         localStorage.setItem('user', JSON.stringify(user));
//
//         alert('Đăng nhập thành công!');
//         window.location.href = 'index.html';
//       } else {
//         throw new Error('Xác thực thất bại!');
//       }
//
//     } catch (err) {
//       errorMessage.textContent = err.message || 'Có lỗi xảy ra!';
//       errorMessage.style.display = 'block';
//     } finally {
//       loginBtn.disabled = false;
//       loginBtn.textContent = 'Đăng nhập';
//     }
//   });
// });
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8080/CourseShop/public/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const result = await response.json();

    if (response.ok) {
      // Giả sử API trả về user name và avatar
      const user = {
        name: result.name,
        role : 'USER'
      };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Đăng nhập thành công!');
      window.location.href = 'index.html';
    } else {
      // Trường hợp đăng nhập không thành công
      alert(result.message || 'Sai email hoặc mật khẩu!');
    }
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error);
    alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
  }
});
