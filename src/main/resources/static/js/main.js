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
    // thêm nhiều khóa học hơn nếu cần
  ];

  // Biến lưu số khóa học hiển thị ban đầu và mỗi lần load thêm
  const initialShow = 2;
  const loadStep = 2;

  // Lưu trạng thái số khóa học đang hiển thị theo từng danh mục
  const showCount = {
    Marketing: initialShow,
    "Công nghệ": initialShow,
    Ngônngữ: initialShow,
    "Ngôn ngữ": initialShow, // dùng key này
  };

  // Xử lý render khóa học theo từng danh mục
  function renderCourses(filteredCourses = null) {
    const container = document.getElementById("courses-container");
    container.innerHTML = "";

    // Nếu có lọc tìm kiếm, dùng mảng đó, ngược lại dùng mảng gốc
    const data = filteredCourses || courses;

    // Lấy danh sách các category duy nhất
    const categories = [...new Set(data.map(c => c.category))];

    categories.forEach(category => {
      // Tạo tiêu đề danh mục
      const categorySection = document.createElement("section");
      categorySection.classList.add("category-section");

      const h2 = document.createElement("h2");
      h2.textContent = category;
      categorySection.appendChild(h2);

      const courseList = document.createElement("div");
      courseList.classList.add("course-list");

      // Lọc khóa học thuộc danh mục này
      const coursesByCat = data.filter(c => c.category === category);

      // Lấy số khóa học cần hiển thị hiện tại
      let count = showCount[category] || initialShow;
      count = Math.min(count, coursesByCat.length);

      // Thêm khóa học vào danh sách
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

      // Nếu còn khóa học chưa hiển thị, thêm nút Load More
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

  // Xử lý tìm kiếm
  function handleSearch() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();

    if (!query) {
      // Nếu rỗng, hiện tất cả
      resetShowCount();
      renderCourses();
      return;
    }

    // Lọc khóa học theo tên hoặc giảng viên chứa query
    const filtered = courses.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.instructor.toLowerCase().includes(query)
    );

    resetShowCount();
    renderCourses(filtered);
  }

  // Đặt lại số lượng hiển thị cho mỗi category về mặc định
  function resetShowCount() {
    for (let key in showCount) {
      showCount[key] = initialShow;
    }
  }

  // Hiển thị thông báo nhỏ
  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = isError ? "error" : "";
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 2500);
  }

  // Quản lý đăng nhập đơn giản bằng localStorage
  function checkLogin() {
    const username = localStorage.getItem("username");
    const authArea = document.getElementById("auth-area");
    const userMenu = document.getElementById("user-menu");
    const userNameSpan = document.getElementById("user-name");

    if (username) {
      authArea.style.display = "none";
      userMenu.style.display = "flex";
      userNameSpan.textContent = username;
    } else {
      authArea.style.display = "flex";
      userMenu.style.display = "none";
    }
  }
  


  // Đăng xuất
  function logout() {
    localStorage.removeItem("username");
    showNotification("Bạn đã đăng xuất.");
    checkLogin();
  }

  // Gán sự kiện khi trang tải xong
  window.onload = () => {
    checkLogin();
    renderCourses();

    document.getElementById("btn-login").onclick = login;
    document.getElementById("logout-btn").onclick = logout;
    document.getElementById("search-btn").onclick = handleSearch;
    document.getElementById("search-input").onkeydown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    
  };
  function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showNotification("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu", true);
    return;
  }

  // Giả sử kiểm tra đăng nhập đơn giản: user/pass cố định (bạn có thể thay logic kiểm tra khác)
  if (username === "admin" && password === "123456") {
    // Lưu username vào localStorage để giữ trạng thái đăng nhập
    localStorage.setItem("username", username);

    showNotification("Đăng nhập thành công!");

    // Cập nhật giao diện
    checkLogin();

    // Xóa ô input sau khi đăng nhập
    usernameInput.value = "";
    passwordInput.value = "";

    // Ẩn modal hoặc popup nếu có (nếu bạn dùng modal)
    const loginModal = document.getElementById("login-modal");
    if (loginModal) {
      loginModal.style.display = "none";
    }

  } else {
    showNotification("Tên đăng nhập hoặc mật khẩu không đúng!", true);
  }
}
