document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử DOM
  const userMenu = document.getElementById("user-menu");
  const authButtons = document.getElementById("auth-buttons");
  const menuName = document.getElementById("user-name");
  const menuAvatar = document.getElementById("user-avatar");
  const courseTitle = document.getElementById("course-title");
  const courseImage = document.getElementById("course-image");
  const courseDescription = document.getElementById("course-description");
  const courseInstructor = document.getElementById("course-instructor");
  const coursePrice = document.getElementById("course-price");
  const btnBuyCourse = document.getElementById("btn-buy-course");
  const sectionList = document.getElementById("section-list");
  const notification = document.getElementById("notification");
  const logoutBtn = document.getElementById("logout-btn");
  const myCoursesLink = document.getElementById("my-courses-link");
  const profileLink = document.getElementById("profile-link");
  const topupLink = document.getElementById("topup-link");
  const contactLink = document.getElementById("contact-link");

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
        if (menuAvatar) menuAvatar.src = user.avatar || "user-avatar.png";
      }
    } else {
      // Chưa đăng nhập: hiển thị auth-buttons, ẩn user-menu
      if (authButtons) authButtons.style.display = "flex";
      if (userMenu) userMenu.style.display = "none";
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

  // Dữ liệu mẫu giả lập (thay bằng API trong thực tế)
  const courseData = [
    {
      sectionTitle: "Chương 1: Giới thiệu",
      lessons: [
        { id: 1, title: "Bài 1: Tổng quan khóa học" },
        { id: 2, title: "Bài 2: Cài đặt môi trường" }
      ]
    },
    {
      sectionTitle: "Chương 2: Kiến thức cơ bản",
      lessons: [
        { id: 3, title: "Bài 3: Biến và kiểu dữ liệu" },
        { id: 4, title: "Bài 4: Toán tử và điều kiện" }
      ]
    },
    {
      sectionTitle: "Chương 3: Nâng cao",
      lessons: [
        { id: 5, title: "Bài 5: Hàm và đối tượng" },
        { id: 6, title: "Bài 6: DOM và sự kiện" }
      ]
    }
  ];

  // Thông tin khóa học mẫu
  const courseInfo = {
    id: "js101",
    name: "Khóa học JavaScript từ cơ bản đến nâng cao",
    image: "https://via.placeholder.com/800x400?text=JavaScript+Course",
    description: "Học JavaScript từ A-Z, giúp bạn xây dựng web tương tác và hiện đại.",
    instructor: "Trần Thị B",
    price: 499000
  };

  // Hàm hiển thị danh sách bài học
  function renderCourseSections(data) {
    if (!sectionList) return;
    sectionList.innerHTML = "";
    data.forEach(section => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "course-section";

      const sectionTitle = document.createElement("h3");
      sectionTitle.textContent = section.sectionTitle;

      const lessonList = document.createElement("ul");
      section.lessons.forEach(lesson => {
        const li = document.createElement("li");
        li.textContent = lesson.title;
        lessonList.appendChild(li);
      });

      sectionDiv.appendChild(sectionTitle);
      sectionDiv.appendChild(lessonList);
      sectionList.appendChild(sectionDiv);
    });
  }

  // Hiển thị chi tiết khóa học
  if (courseTitle) courseTitle.textContent = courseInfo.name;
  if (courseImage) courseImage.src = courseInfo.image;
  if (courseDescription) courseDescription.textContent = courseInfo.description;
  if (courseInstructor) courseInstructor.textContent = courseInfo.instructor;
  if (coursePrice) coursePrice.textContent = courseInfo.price.toLocaleString("vi-VN");

  // Hiển thị danh sách bài học
  renderCourseSections(courseData);

  // Kiểm tra khóa học đã mua chưa
  if (user && user.myCourses && user.myCourses.some(course => course.id === courseInfo.id)) {
    if (btnBuyCourse) {
      btnBuyCourse.textContent = "Đã sở hữu";
      btnBuyCourse.disabled = true;
      btnBuyCourse.style.background = "#6b7280";
      btnBuyCourse.style.cursor = "not-allowed";
    }
  }

  // Xử lý nút Mua khóa học
  if (btnBuyCourse) {
    btnBuyCourse.addEventListener("click", () => {
      if (!user) {
        showNotification("Vui lòng đăng nhập để mua khóa học!", true);
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
        return;
      }

      // Lưu thông tin khóa học vào localStorage
      localStorage.setItem("selectedCourse", JSON.stringify({
        id: courseInfo.id,
        name: courseInfo.name,
        price: courseInfo.price
      }));

      // Chuyển hướng đến trang thanh toán
      window.location.href = "payment.html";
    });
  }
});