 document.addEventListener("DOMContentLoaded", () => {
      // Lấy các phần tử DOM
      const userMenu = document.getElementById("user-menu");
      const authButtons = document.getElementById("auth-buttons");
      const menuName = document.getElementById("user-name");
      const courseInfoDiv = document.getElementById("course-info");
      const qrCodeDiv = document.getElementById("qr-code");
      const paymentForm = document.getElementById("payment-form");
      const transactionCodeInput = document.getElementById("transaction-code");
      const btnPaid = document.getElementById("btn-paid");
      const btnCancel = document.getElementById("btn-cancel");
      const successMsg = document.getElementById("success-message");
      const notification = document.getElementById("notification");
      const logoutBtn = document.getElementById("logout-btn");
      const myCoursesLink = document.getElementById("my-course-link");
      const profileLink = document.getElementById("profile-link");
      const topupLink = document.getElementById("topup-link");
      const contactLink = document.getElementById("contact-link");
      const topupGuideLink = document.getElementById("topup-guide-link");

      // Hàm hiển thị thông báo
      function showNotification(message, isError = false) {
        if (!notification) return console.error("Notification element not found");
        notification.textContent = message;
        notification.className = isError ? "error" : "";
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
        }, 3000);
      }

      // Kiểm tra trạng thái đăng nhập
      function checkLogin() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          // Đã đăng nhập: ẩn auth-buttons, hiển thị user-menu
          if (authButtons) authButtons.style.display = "none";
          if (userMenu) {
            userMenu.style.display = "flex";
            if (menuName) menuName.textContent = user.name || "User";
          }
        } else {
          // Chưa đăng nhập: hiển thị auth-buttons, ẩn user-menu
          if (authButtons) authButtons.style.display = "flex";
          if (userMenu) userMenu.style.display = "none";
          // Chuyển hướng đến trang đăng nhập
          showNotification("Vui lòng đăng nhập để thanh toán!", true);
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
          return false;
        }
        return true;
      }

      // Hàm đăng xuất
      function logout() {
        localStorage.removeItem("user");
        showNotification("Bạn đã đăng xuất.");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }

      // Kiểm tra đăng nhập khi tải trang
      if (!checkLogin()) return;

      // Toggle menu người dùng
      if (userMenu) {
        userMenu.onclick = (e) => {
          e.stopPropagation();
          userMenu.classList.toggle("active");
        };
      }

      // Đóng menu khi click bên ngoài
      document.addEventListener("click", (e) => {
        if (userMenu && !userMenu.contains(e.target)) {
          userMenu.classList.remove("active");
        }
      });

      // Ngăn menu đóng khi click vào menu con
      if (userMenu) {
        const userMenuUl = userMenu.querySelector("ul");
        if (userMenuUl) {
          userMenuUl.onclick = (e) => {
            e.stopPropagation();
          };
        }
      }

      // Gắn sự kiện cho các liên kết trong menu
      if (logoutBtn) {
        logoutBtn.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          logout();
        };
      }

      if (myCoursesLink) {
        myCoursesLink.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          window.location.href = "my-course.html";
        };
      }

      if (profileLink) {
        profileLink.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          window.location.href = "profile.html";
        };
      }

      if (topupLink) {
        topupLink.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          window.location.href = "topup.html";
        };
      }

      if (contactLink) {
        contactLink.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          window.location.href = "contact.html";
        };
      }

      if (topupGuideLink) {
        topupGuideLink.onclick = (e) => {
          e.preventDefault();
          userMenu.classList.remove("active");
          window.location.href = "topup-guide.html";
        };
      }

      // Lấy dữ liệu khóa học từ localStorage
      const selectedCourse = JSON.parse(localStorage.getItem("selectedCourse"));

      if (!selectedCourse) {
        if (courseInfoDiv) {
          courseInfoDiv.textContent = "Không có thông tin khóa học để thanh toán.";
        }
        if (btnCancel) {
          btnCancel.addEventListener("click", () => {
            showNotification("Không có giao dịch để hủy!", true);
            setTimeout(() => {
              window.location.href = "course.html";
            }, 2000);
          });
        }
        return;
      }

      // Hiển thị thông tin khóa học
      if (courseInfoDiv) {
        courseInfoDiv.textContent = `Bạn đang thanh toán khóa học: "${selectedCourse.name}" với giá ${Number(selectedCourse.price).toLocaleString('vi-VN')} VND`;
      }

      // Tạo QR Code
      if (qrCodeDiv) {
        const paymentUrl = `https://payment.example.com/pay?courseId=${selectedCourse.id}&amount=${selectedCourse.price}`;
        QRCode.toCanvas(qrCodeDiv, paymentUrl, { width: 200 }, function (error) {
          if (error) {
            console.error(error);
            if (courseInfoDiv) {
              courseInfoDiv.textContent = "Lỗi khi tạo QR Code.";
            }
          }
        });
      }

      // Kiểm tra số dư
      const user = JSON.parse(localStorage.getItem("user"));
      let isBalanceSufficient = true;

      if (user && parseInt(user.balance || 0) < parseInt(selectedCourse.price)) {
        showNotification("Số dư không đủ! Vui lòng nạp tiền.", true);
        if (paymentForm) paymentForm.style.display = "none";
        if (btnCancel) btnCancel.textContent = "Nạp tiền";
        isBalanceSufficient = false;
      }

      // Xử lý form thanh toán
      if (paymentForm) {
        paymentForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const transactionCode = transactionCodeInput.value.trim();

          if (!transactionCode) {
            showNotification("Vui lòng nhập mã giao dịch!", true);
            return;
          }

          // Cập nhật số dư và lưu khóa học
          user.balance = parseInt(user.balance || 0) - parseInt(selectedCourse.price);
          user.myCourses = user.myCourses || [];
          user.myCourses.push(selectedCourse);
          localStorage.setItem("user", JSON.stringify(user));

          // Ẩn form và nút hủy, hiển thị thông báo thành công
          if (paymentForm) paymentForm.style.display = "none";
          if (btnCancel) btnCancel.style.display = "none";
          if (successMsg) successMsg.style.display = "block";
          showNotification(`Thanh toán thành công với mã giao dịch: ${transactionCode}!`);

          // Xóa khóa học đã chọn và chuyển hướng
          localStorage.removeItem("selectedCourse");
          setTimeout(() => {
            window.location.href = "my-course.html";
          }, 3000);
        });
      }

      // Xử lý nút Hủy thanh toán
      if (btnCancel) {
        btnCancel.addEventListener("click", (e) => {
          e.preventDefault();
          if (!isBalanceSufficient) {
            // Nếu số dư không đủ, chuyển hướng đến trang nạp tiền
            showNotification("Chuyển hướng đến trang nạp tiền...");
            localStorage.removeItem("selectedCourse");
            setTimeout(() => {
              window.location.href = "topup.html";
            }, 2000);
          } else {
            // Nếu số dư đủ, hủy thanh toán và quay lại trang khóa học
            showNotification("Đã hủy thanh toán!", true);
            localStorage.removeItem("selectedCourse");
            setTimeout(() => {
              window.location.href = "course.html";
            }, 2000);
          }
        });
      }
    });