document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử DOM
  const userMenu = document.getElementById("user-menu");
  const authButtons = document.getElementById("auth-buttons");
  const menuName = document.getElementById("user-name");
  const menuAvatar = document.getElementById("user-avatar");
  const courseTitle = document.getElementById("course-title");
  const courseDescription = document.getElementById("course-description");
  const courseVideo = document.getElementById("course-video");
  const lessonsList = document.getElementById("lessons");
  const notification = document.getElementById("notification");
  const logoutBtn = document.getElementById("logout-btn");
  const myCoursesLink = document.getElementById("my-courses-link");
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
      if (authButtons) authButtons.style.display = "none";
      if (userMenu) {
        userMenu.style.display = "flex";
        if (menuName) menuName.textContent = user.name || "User";
        if (menuAvatar) menuAvatar.src = user.avatar || "user-avatar.png";
      }
    } else {
      if (authButtons) authButtons.style.display = "flex";
      if (userMenu) userMenu.style.display = "none";
      showNotification("Vui lòng đăng nhập để xem bài giảng!", true);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
      return null;
    }
    return user;
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

  // Lấy courseId từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");

  // Dữ liệu khóa học mẫu (thay bằng API trong thực tế)
  const courses = [
    {
      id: "js101",
      name: "Lập trình JavaScript cơ bản",
      description: "Học các kiến thức cơ bản về JavaScript để xây dựng web tương tác.",
      lessons: [
        { id: "js101-1", title: "Giới thiệu JavaScript", videoUrl: "https://example.com/videos/js101-1.mp4" },
        { id: "js101-2", title: "Biến và kiểu dữ liệu", videoUrl: "https://example.com/videos/js101-2.mp4" },
        { id: "js101-3", title: "Hàm trong JavaScript", videoUrl: "https://example.com/videos/js101-3.mp4" }
      ]
    },
    {
      id: "py101",
      name: "Python cho người mới bắt đầu",
      description: "Khóa học Python từ cơ bản đến nâng cao dành cho người mới.",
      lessons: [] // Trường hợp không có bài giảng
    }
  ];

  // Kiểm tra quyền sở hữu khóa học
  function checkCourseOwnership(courseId) {
    if (!user.myCourses || !user.myCourses.some(c => c.id === courseId)) {
      showNotification("Bạn chưa sở hữu khóa học này!", true);
      setTimeout(() => {
        window.location.href = "courses.html";
      }, 1500);
      return false;
    }
    return true;
  }

  // Hàm render thông tin khóa học
  function renderCourse(course) {
    if (!course) {
      showNotification("Không tìm thấy khóa học!", true);
      setTimeout(() => {
        window.location.href = "courses.html";
      }, 1500);
      return;
    }

    if (courseTitle) courseTitle.textContent = course.name;
    if (courseDescription) courseDescription.textContent = course.description;

    // Kiểm tra danh sách bài giảng
    if (lessonsList) {
      lessonsList.innerHTML = "";
      if (!course.lessons || course.lessons.length === 0) {
        lessonsList.innerHTML = '<p>Khóa học hiện chưa có bài giảng.</p>';
        if (courseVideo) courseVideo.style.display = "none";
        return;
      }

      // Render danh sách bài giảng
      course.lessons.forEach((lesson, index) => {
        const li = document.createElement("li");
        li.className = index === 0 ? "active" : "";
        li.innerHTML = `<a href="#" data-video="${lesson.videoUrl}" data-title="${lesson.title}">${lesson.title}</a>`;
        lessonsList.appendChild(li);
      });

      // Phát video đầu tiên
      if (course.lessons.length > 0 && courseVideo) {
        courseVideo.src = course.lessons[0].videoUrl;
        courseVideo.load();
        courseVideo.style.display = "block";
      }

      // Gắn sự kiện cho các bài học
      const lessonLinks = lessonsList.querySelectorAll("a");
      lessonLinks.forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const videoUrl = link.getAttribute("data-video");
          if (courseVideo) {
            courseVideo.src = videoUrl;
            courseVideo.load();
          }
          lessonsList.querySelectorAll("li").forEach(l => l.classList.remove("active"));
          link.parentElement.classList.add("active");
        });
      });
    }
  }

  // Tìm khóa học theo ID và kiểm tra quyền sở hữu
  const course = courses.find(c => c.id === courseId);
  if (!course || !courseId) {
    showNotification("Không tìm thấy khóa học!", true);
    setTimeout(() => {
      window.location.href = "course.html";
    }, 1500);
    return;
  }

  if (!checkCourseOwnership(courseId)) return;

  // Hiển thị thông tin khóa học
  renderCourse(course);
});