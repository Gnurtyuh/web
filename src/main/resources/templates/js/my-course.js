    document.addEventListener("DOMContentLoaded", () => {
      // Lấy các phần tử DOM
      const userMenu = document.getElementById("user-menu");
      const authButtons = document.getElementById("auth-buttons");
      const menuName = document.getElementById("user-name");
      const myCoursesList = document.getElementById("my-courses-list");
      const noCoursesMsg = document.getElementById("no-courses");
      const notification = document.getElementById("notification");
      const logoutBtn = document.getElementById("logout-btn");
      const myCoursesLink = document.getElementById("my-courses-link");
      const profileLink = document.getElementById("profile-link");
      const topupLink = document.getElementById("topup-link");
      const contactLink = document.getElementById("contact-link");
      const topupGuideLink = document.getElementById("topup-guide-link");
      const token = localStorage.getItem("userToken");
        async function fetchMyCourses(token) {
            try {
                const res = await fetch("http://localhost:8080/CourseShop/api/users/course/myCourse", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Không thể lấy danh sách khóa học");
                }

                const data = await res.json();
                return data.courses || [];
            } catch (error) {
                console.error("Lỗi khi lấy khóa học:", error);
                showNotification("Lỗi khi tải danh sách khóa học", true);
                return [];
            }
        }

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
        if (user && token) {
          // Đã đăng nhập: ẩn auth-buttons, hiển thị user-menu
          if (authButtons) authButtons.style.display = "none";
          if (userMenu) {
            userMenu.style.display = "flex";
            if (menuName) menuName.textContent = user.name || "User";
          }
            return { user, token };
        } else {
          // Chưa đăng nhập: hiển thị auth-buttons, ẩn user-menu
          if (authButtons) authButtons.style.display = "flex";
          if (userMenu) userMenu.style.display = "none";
          // Chuyển hướng đến trang đăng nhập
          showNotification("Vui lòng đăng nhập để xem khóa học!", true);
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
          return null;
        }
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
      const user = checkLogin();
      if (!user) return;

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

      if (userMenu) {
        const userMenuUl = userMenu.querySelector("ul");
        if (userMenuUl) {
          userMenuUl.onclick = (e) => {
            e.stopPropagation();
          };
        }
      }

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
          window.location.href = "my-courses.html";
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
      function goToCourse(courseId) {
            window.location.href = `course.html?id=${courseId}`;
      }
      // Hàm hiển thị danh sách khóa học
      function renderMyCourses(courses) {
        if (!myCoursesList || !noCoursesMsg) return;

        if (!courses || courses.length === 0) {
          myCoursesList.style.display = "none";
          noCoursesMsg.style.display = "block";
          return;
        }

        noCoursesMsg.style.display = "none";
        myCoursesList.style.display = "grid";
        myCoursesList.innerHTML = "";

        courses.forEach(course => {
          const card = document.createElement("div");
          card.className = "course-card";

          // Sử dụng ảnh mặc định nếu không có
          const image = course.image || "https://via.placeholder.com/280x150?text=" + encodeURIComponent(course.name);
          const description = course.description || "Khóa học giúp bạn nâng cao kỹ năng.";

          card.innerHTML = `
            <img src="${image}" alt="Ảnh khóa học" loading="lazy" />
            <h3>${course.name}</h3>
            <p>${description}</p>
            <button onclick="goToCourse(course.id)">Xem khóa học</button>
          `;

          myCoursesList.appendChild(card);
        });
      }

      // Hàm chuyển hướng đến trang chi tiết khóa học


        fetchMyCourses(user.token).then(courses => {
            renderMyCourses(courses);
        });

    });