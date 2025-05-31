 const courses = [
      {id: 1, category: "Marketing", title: "Digital Marketing A-Z", instructor: "Minh Tâm", description: "Khóa học marketing tổng quan từ A đến Z" },
      {id: 2, category: "Marketing", title: "Digital Content Marketing", instructor: "Lan Anh", description: "Học cách tạo nội dung digital thu hút" },
      {id: 3, category: "Marketing", title: "TikTok Marketing", instructor: "Minh Tâm", description: "Chiến lược quảng cáo trên TikTok" },
      {id: 4, category: "Công nghệ", title: "Lập trình Web", instructor: "Hoàng Nam", description: "Tìm hiểu cơ bản về phát triển web" },
      {id: 5, category: "Công nghệ", title: "Lập trình Java", instructor: "Tuấn Anh", description: "Khóa học Java căn bản đến nâng cao" },
      {id: 6, category: "Công nghệ", title: "Phân tích dữ liệu Python", instructor: "Bảo Châu", description: "Phân tích dữ liệu với Python" },
      {id: 7, category: "Ngôn ngữ", title: "Tiếng Nhật", instructor: "Yuki", description: "Học tiếng Nhật từ cơ bản đến nâng cao" },
      {id: 8, category: "Ngôn ngữ", title: "Tiếng Hàn", instructor: "Soojin", description: "Khóa học tiếng Hàn tổng quát" },
      {id: 9, category: "Ngôn ngữ", title: "Tiếng Anh", instructor: "John Doe", description: "Tiếng Anh giao tiếp hiệu quả" },
    ];

    const initialShow = 2;
    const loadStep = 2;

    const showCount = {
      Marketing: initialShow,
      "Công nghệ": initialShow,
      "Ngôn ngữ": initialShow,
    };

    function renderCourses(filteredCourses = null) {
      const container = document.getElementById("courses-container");
      container.innerHTML = "";

      const data = filteredCourses || courses;
      const categories = [...new Set(data.map(c => c.category))];

      categories.forEach(category => {
        const categorySection = document.createElement("section");
        categorySection.classList.add("category-section");

        const h2 = document.createElement("h2");
        h2.textContent = category;
        categorySection.appendChild(h2);

        const courseList = document.createElement("div");
        courseList.classList.add("course-list");

        const coursesByCat = data.filter(c => c.category === category);
        let count = showCount[category] || initialShow;
        count = Math.min(count, coursesByCat.length);

        for (let i = 0; i < count; i++) {
          const course = coursesByCat[i];
          const courseItem = document.createElement("div");
          courseItem.classList.add("course-item");

          const title = document.createElement("h3");
          title.textContent = course.title;

          const instructor = document.createElement("p");
          instructor.innerHTML = `<strong>Giảng viên:</strong> ${course.instructor}`;

          const desc = document.createElement("p");
          desc.textContent = course.description;

          const btnDetail = document.createElement("button");
          btnDetail.textContent = "Chi tiết";
          btnDetail.classList.add("btn-detail");
          btnDetail.onclick = () => {
            alert(`Xem chi tiết khóa học:\n${course.title}\nGiảng viên: ${course.instructor}`);
          };

          const btnBuy = document.createElement("button");
          btnBuy.textContent = "Mua";
          btnBuy.classList.add("btn-buy");
          btnBuy.onclick = () => {
            alert(`Bạn đã mua khóa học: ${course.title}`);
          };

          courseItem.appendChild(title);
          courseItem.appendChild(instructor);
          courseItem.appendChild(desc);
          courseItem.appendChild(btnDetail);
          courseItem.appendChild(btnBuy);

          courseList.appendChild(courseItem);
        }

        categorySection.appendChild(courseList);

        if (count < coursesByCat.length) {
          const btnLoadMore = document.createElement("button");
          btnLoadMore.textContent = "Xem thêm";
          btnLoadMore.classList.add("btn-buy");
          btnLoadMore.style.backgroundColor = "#007bff";
          btnLoadMore.style.marginTop = "10px";

          btnLoadMore.onclick = () => {
            showCount[category] = (showCount[category] || initialShow) + loadStep;
            renderCourses(filteredCourses);
          };

          categorySection.appendChild(btnLoadMore);
        }

        container.appendChild(categorySection);
      });
    }

    function handleSearch() {
      const query = document.getElementById("search-input").value.trim().toLowerCase();

      if (!query) {
        resetShowCount();
        renderCourses();
        return;
      }

      const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.instructor.toLowerCase().includes(query)
      );

      resetShowCount();
      renderCourses(filtered);
    }

    function resetShowCount() {
      for (let key in showCount) {
        showCount[key] = initialShow;
      }
    }

    function showNotification(message, isError = false) {
      const notification = document.getElementById("notification");
      notification.textContent = message;
      notification.className = isError ? "error" : "";
      notification.style.display = "block";

      setTimeout(() => {
        notification.style.display = "none";
      }, 2500);
    }

    function checkLogin() {
      const user = JSON.parse(localStorage.getItem("user"));
      const authArea = document.getElementById("auth-area");
      const userMenu = document.getElementById("user-menu");
      const userNameSpan = document.getElementById("user-name");
      const userAvatar = document.getElementById("user-avatar");

      if (user) {
        authArea.style.display = "none";
        userMenu.style.display = "flex";
        userNameSpan.textContent = user.name;
        userAvatar.src = user.avatar || "user-avatar.png";
      } else {
        authArea.style.display = "flex";
        userMenu.style.display = "none";
      }
    }

    function logout() {
      localStorage.removeItem("user");
      showNotification("Bạn đã đăng xuất.");
      checkLogin();
    }

    function myCourses() {
      alert("Chuyển đến trang danh sách khóa học của bạn!");
      // Có thể thay bằng chuyển hướng: window.location.href = "my-courses.html";
    }

    function topUp() {
      alert("Chuyển đến trang nạp tiền!");
      // Có thể thay bằng chuyển hướng: window.location.href = "top-up.html";
    }

    window.onload = () => {
      checkLogin();
      renderCourses();

      const userMenu = document.getElementById("user-menu");

      userMenu.onclick = (e) => {
        e.stopPropagation();
        userMenu.classList.toggle("active");
      };

      document.addEventListener("click", (e) => {
        if (!userMenu.contains(e.target)) {
          userMenu.classList.remove("active");
        }
      });

      userMenu.querySelector("ul").onclick = (e) => {
        e.stopPropagation();
      };

      document.getElementById("logout-btn").onclick = () => {
        userMenu.classList.remove("active");
        logout();
      };
      document.getElementById("my-courses-link").onclick = () => {
        userMenu.classList.remove("active");
        myCourses();
      };
      document.getElementById("top-up-link").onclick = () => {
        userMenu.classList.remove("active");
        topUp();
      };
      document.getElementById("profile-link").onclick = () => {
        userMenu.classList.remove("active");
        alert("Chuyển đến trang thông tin cá nhân!");
        // Có thể thay bằng chuyển hướng: window.location.href = "profile.html";
      };
      document.getElementById("search-btn").onclick = handleSearch;
      document.getElementById("search-input").onkeydown = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };
    };
