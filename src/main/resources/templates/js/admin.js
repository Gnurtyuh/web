document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".sidebar-nav ul li[data-section]");
  const logoutBtn = document.getElementById("logout-btn");
  const createCourseForm = document.getElementById("create-course-form");

  let courses = [
    {
      id: 1,
      title: "Digital Marketing A-Z",
      price: 1200000,
      thumbnail_url: "[invalid url, do not cite]",
      chapters: [
        {
          id: 1,
          title: "Introduction",
          section_order: 1,
          lessons: [
            { id: 1, title: "Lesson 1: Basics", content: "Introduction text", lesson_order: 1, video_url: "[invalid url, do not cite]" },
            { id: 2, title: "Lesson 2: Strategies", content: "Strategy overview", lesson_order: 2, video_url: null }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Lập trình Python căn bản",
      price: 800000,
      thumbnail_url: null,
      chapters: []
    }
  ];

  let users = [
    { id: 1, username: "user1", email: "user1@example.com", role: "Học viên" },
    { id: 2, username: "admin", email: "admin@example.com", role: "Quản trị viên" },
  ];

  let topupRequests = [
    { id: 1, user_id: 1, transaction_code: "TXN001", amount: 100000, status: "pending", created_at: new Date("2025-06-01T10:00:00Z") },
    { id: 2, user_id: 2, transaction_code: "TXN002", amount: 500000, status: "success", created_at: new Date("2025-06-02T12:00:00Z") },
  ];

  // Chuyển tab sidebar
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const sectionId = item.getAttribute("data-section");
      sections.forEach((section) => section.classList.remove("active"));
      document.getElementById(sectionId)?.classList.add("active");
    });
  });

  // Đăng xuất
  logoutBtn?.addEventListener("click", () => {
    alert("Đăng xuất thành công!");
    window.location.href = "login.html";
  });

  // Thống kê
  function loadStatistics() {
    document.getElementById("total-users").textContent = users.length.toLocaleString();
    document.getElementById("total-revenue").textContent = "2,500,000 VNĐ";
    document.getElementById("top-course").textContent = "Digital Marketing A-Z";
  }

  // Biểu đồ thống kê
  function initChart() {
    const ctx = document.getElementById("statisticsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        datasets: [
          {
            label: "Người dùng mới",
            data: [120, 150, 100, 200, 250],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Doanh thu (triệu VNĐ)",
            data: [10, 15, 7, 20, 22],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Thống kê hệ thống theo tháng",
            font: { size: 18 },
          },
        },
      },
    });
  }

  // Xử lý tạo khóa học
  createCourseForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, description, price } = createCourseForm;

    if (!title.value.trim() || !description.value.trim() || !price.value.trim()) {
      return showNotification("Vui lòng điền đầy đủ thông tin!", true);
    }

    const newCourse = {
      id: Date.now(),
      title: title.value.trim(),
      price: parseInt(price.value.trim()),
      chapters: [],
    };

    courses.push(newCourse);
    showNotification(`Tạo khóa học thành công: ${newCourse.title}`);
    createCourseForm.reset();

    // Cập nhật dropdown khóa học và chọn khóa học mới tạo
    populateCourseDropdown();
    document.getElementById("course-select").value = newCourse.id;
    loadChapters(newCourse.id);
    document.querySelector("#lessons-table tbody").innerHTML = "";
  });

  function switchTab(sectionId) {
    navItems.forEach((i) => i.classList.remove("active"));
    document.querySelector(`[data-section="${sectionId}"]`)?.classList.add("active");
    sections.forEach((s) => s.classList.remove("active"));
    document.getElementById(sectionId)?.classList.add("active");
  }

  function loadCourses() {
    const tbody = document.querySelector("#courses-table tbody");
    tbody.innerHTML = "";

    courses.forEach((course) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${course.id}</td>
        <td>${course.title}</td>
        <td>${course.price.toLocaleString()} VNĐ</td>
        <td>
          <button class="btn-edit" data-id="${course.id}">Sửa</button>
          <button class="btn-delete" data-id="${course.id}">Xóa</button>
        </td>`;
      tbody.appendChild(tr);
    });

    document.querySelectorAll("#courses-table .btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => editCourse(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll("#courses-table .btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteCourse(parseInt(btn.dataset.id)));
    });
  }

  function editCourse(id) {
    const course = courses.find((c) => c.id === id);
    if (!course) return showNotification("Không tìm thấy khóa học!", true);

    const newTitle = prompt("Nhập tiêu đề mới:", course.title);
    if (newTitle === null) return;

    const newPriceStr = prompt("Nhập giá tiền mới (VNĐ):", course.price);
    if (newPriceStr === null) return;

    const newPrice = parseInt(newPriceStr);
    if (isNaN(newPrice) || newPrice < 0) return showNotification("Giá tiền không hợp lệ!", true);

    course.title = newTitle.trim();
    course.price = newPrice;

    showNotification("Cập nhật khóa học thành công!");
    loadCourses();
  }

  function deleteCourse(id) {
    if (!confirm("Bạn có chắc muốn xóa khóa học?")) return;

    courses = courses.filter((c) => c.id !== id);
    showNotification("Xóa khóa học thành công!");
    loadCourses();
  }

  function loadUsers() {
    const tbody = document.querySelector("#users-table tbody");
    tbody.innerHTML = "";

    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="btn-edit" data-id="${user.id}">Sửa</button>
          <button class="btn-delete" data-id="${user.id}">Xóa</button>
        </td>`;
      tbody.appendChild(tr);
    });

    // Gắn sự kiện cho các nút sửa và xóa
    document.querySelectorAll("#users-table .btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => editUser(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll("#users-table .btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteUser(parseInt(btn.dataset.id)));
    });
  }

  function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return showNotification("Không tìm thấy học viên!", true);

    const newUsername = prompt("Nhập tên đăng nhập mới:", user.username);
    if (newUsername === null) return;

    const newEmail = prompt("Nhập email mới:", user.email);
    if (newEmail === null) return;

    const newRole = prompt("Nhập vai trò mới:", user.role);
    if (newRole === null) return;

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      return showNotification("Email không hợp lệ!", true);
    }

    user.username = newUsername.trim();
    user.email = newEmail.trim();
    user.role = newRole.trim();

    showNotification("Cập nhật học viên thành công!");
    loadUsers();
    loadStatistics(); // Cập nhật số liệu tổng số học viên
  }

  function deleteUser(id) {
    if (!confirm("Bạn có chắc muốn xóa học viên này?")) return;

    // Kiểm tra xem học viên có yêu cầu nạp tiền đang chờ xử lý không
    const hasPendingTopup = topupRequests.some(req => req.user_id === id && req.status === "pending");
    if (hasPendingTopup) {
      return showNotification("Không thể xóa học viên vì có yêu cầu nạp tiền đang chờ xử lý!", true);
    }

    users = users.filter((u) => u.id !== id);
    showNotification("Xóa học viên thành công!");
    loadUsers();
    loadTopupRequests(); // Cập nhật bảng nạp tiền
    loadStatistics(); // Cập nhật số liệu tổng số học viên
  }

  function loadTopupRequests() {
    const tbody = document.querySelector("#topup-table tbody");
    tbody.innerHTML = "";

    topupRequests.forEach((req) => {
      const user = users.find(u => u.id === req.user_id) || { username: "Unknown" };
      const statusText = req.status === "pending" ? "Chờ duyệt" : req.status === "success" ? "Thành công" : "Thất bại";
      const tr = document.createElement("tr");
      tr.setAttribute('data-id', req.id);
      tr.innerHTML = `
        <td>${req.id}</td>
        <td>${req.transaction_code}</td>
        <td>${req.user_id}</td>
        <td>${user.username}</td>
        <td>${req.amount.toLocaleString()} VNĐ</td>
        <td class="status">${statusText}</td>
        <td>${new Date(req.created_at).toLocaleString('vi-VN')}</td>
        <td class="actions">
          ${req.status === "pending" ? `
            <button class="btn-approve" data-id="${req.id}">Duyệt</button>
            <button class="btn-reject" data-id="${req.id}">Từ chối</button>
          ` : ""}
        </td>`;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-approve").forEach((btn) =>
      btn.addEventListener("click", () => updateTopupStatus(parseInt(btn.dataset.id), "success"))
    );

    document.querySelectorAll(".btn-reject").forEach((btn) =>
      btn.addEventListener("click", () => updateTopupStatus(parseInt(btn.dataset.id), "failed"))
    );
  }

  function updateTopupStatus(id, status) {
    const req = topupRequests.find((r) => r.id === id);
    if (!req) return showNotification("Yêu cầu không tồn tại!", true);
    req.status = status;

    const row = document.querySelector(`#topup-table tbody tr[data-id="${id}"]`);
    if (row) {
      const statusCell = row.querySelector('.status');
      statusCell.textContent = status === "success" ? "Thành công" : "Thất bại";
      const actionsCell = row.querySelector('.actions');
      actionsCell.innerHTML = '';
    }

    showNotification(`Yêu cầu ${id} đã được ${status === "success" ? "duyệt" : "từ chối"}!`, status !== "success");
  }

  function populateCourseDropdown() {
    const courseSelect = document.getElementById("course-select");
    courseSelect.innerHTML = '<option value="">Chọn khóa học</option>';
    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course.id;
      option.textContent = course.title;
      courseSelect.appendChild(option);
    });
  }

  function populateChapterDropdown(courseId) {
    const chapterSelect = document.getElementById("chapter-select");
    chapterSelect.innerHTML = '<option value="">Chọn chương</option>';
    const course = courses.find(c => c.id === parseInt(courseId));
    if (course && course.chapters) {
      course.chapters.forEach(chapter => {
        const option = document.createElement("option");
        option.value = chapter.id;
        option.textContent = chapter.title;
        chapterSelect.appendChild(option);
      });
    }
  }

  function loadChapters(courseId) {
    const course = courses.find(c => c.id === parseInt(courseId));
    const tbody = document.querySelector("#chapters-table tbody");
    tbody.innerHTML = "";
    if (course && course.chapters) {
      course.chapters.forEach(chapter => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${chapter.id}</td>
          <td>${chapter.title}</td>
          <td>${chapter.section_order}</td>
          <td>
            <button class="btn-edit" data-course-id="${courseId}" data-chapter-id="${chapter.id}">Sửa</button>
            <button class="btn-delete" data-course-id="${courseId}" data-chapter-id="${chapter.id}">Xóa</button>
          </td>`;
        tbody.appendChild(tr);
      });

      document.querySelectorAll("#chapters-table .btn-edit").forEach(btn => {
        btn.addEventListener("click", () => editChapter(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId)));
      });
      document.querySelectorAll("#chapters-table .btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deleteChapter(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId)));
      });
    }
  }

  function loadLessons(courseId, chapterId) {
    const course = courses.find(c => c.id === parseInt(courseId));
    const chapter = course?.chapters.find(ch => ch.id === parseInt(chapterId));
    const tbody = document.querySelector("#lessons-table tbody");
    tbody.innerHTML = "";
    if (chapter && chapter.lessons) {
      chapter.lessons.forEach(lesson => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${lesson.id}</td>
          <td>${lesson.title}</td>
          <td>${lesson.content || "N/A"}</td>
          <td>${lesson.video_url || "N/A"}</td>
          <td>${lesson.lesson_order}</td>
          <td>
            <button class="btn-edit" data-course-id="${courseId}" data-chapter-id="${chapterId}" data-lesson-id="${lesson.id}">Sửa</button>
            <button class="btn-delete" data-course-id="${courseId}" data-chapter-id="${chapterId}" data-lesson-id="${lesson.id}">Xóa</button>
          </td>`;
        tbody.appendChild(tr);
      });

      document.querySelectorAll("#lessons-table .btn-edit").forEach(btn => {
        btn.addEventListener("click", () => editLesson(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId), parseInt(btn.dataset.lessonId)));
      });
      document.querySelectorAll("#lessons-table .btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deleteLesson(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId), parseInt(btn.dataset.lessonId)));
      });
    }
  }

  document.getElementById("create-chapter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const courseId = parseInt(document.getElementById("course-select").value);
    const title = document.getElementById("chapter-title").value.trim();
    const order = parseInt(document.getElementById("chapter-order").value);

    if (!courseId || !title || isNaN(order)) return showNotification("Vui lòng điền đầy đủ thông tin!", true);

    const course = courses.find(c => c.id === courseId);
    if (!course) return showNotification("Khóa học không tồn tại!", true);

    const newChapter = {
      id: Date.now(),
      title,
      section_order: order,
      lessons: []
    };

    course.chapters.push(newChapter);
    showNotification(`Tạo chương thành công: ${title}`);
    document.getElementById("create-chapter-form").reset();
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  });

  document.getElementById("create-lesson-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const courseId = parseInt(document.getElementById("course-select").value);
    const chapterId = parseInt(document.getElementById("chapter-select").value);
    const title = document.getElementById("lesson-title").value.trim();
    const content = document.getElementById("lesson-content").value.trim();
    const videoUrl = document.getElementById("lesson-video").value.trim() || null;
    const order = parseInt(document.getElementById("lesson-order").value);

    if (!courseId || !chapterId || !title || isNaN(order)) return showNotification("Vui lòng điền đầy đủ thông tin!", true);

    const course = courses.find(c => c.id === courseId);
    if (!course) return showNotification("Khóa học không tồn tại!", true);

    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return showNotification("Chương không tồn tại!", true);

    const newLesson = {
      id: Date.now(),
      title,
      content: content || null,
      video_url: videoUrl,
      lesson_order: order
    };

    chapter.lessons.push(newLesson);
    showNotification(`Tạo bài học thành công: ${title}`);
    document.getElementById("create-lesson-form").reset();
    loadLessons(courseId, chapterId);
  });

  function editChapter(courseId, chapterId) {
    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return showNotification("Chương không tồn tại!", true);

    const newTitle = prompt("Nhập tiêu đề mới:", chapter.title);
    if (newTitle === null) return;

    const newOrder = prompt("Nhập thứ tự mới:", chapter.section_order);
    if (newOrder === null) return;

    const orderNum = parseInt(newOrder);
    if (isNaN(orderNum)) return showNotification("Thứ tự không hợp lệ!", true);

    chapter.title = newTitle.trim();
    chapter.section_order = orderNum;
    showNotification("Cập nhật chương thành công!");
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  }

  function deleteChapter(courseId, chapterId) {
    if (!confirm("Bạn có chắc muốn xóa chương này? Tất cả bài học trong chương cũng sẽ bị xóa!")) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return showNotification("Khóa học không tồn tại!", true);

    course.chapters = course.chapters.filter(ch => ch.id !== chapterId);
    showNotification("Xóa chương thành công!");
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  }

  function editLesson(courseId, chapterId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    const lesson = chapter?.lessons.find(l => l.id === lessonId);
    if (!lesson) return showNotification("Bài học không tồn tại!", true);

    const newTitle = prompt("Nhập tiêu đề mới:", lesson.title);
    if (newTitle === null) return;

    const newContent = prompt("Nhập nội dung mới:", lesson.content || "");
    const newVideoUrl = prompt("Nhập URL video mới (để trống nếu không có):", lesson.video_url || "");
    const newOrder = prompt("Nhập thứ tự mới:", lesson.lesson_order);
    if (newOrder === null) return;

    const orderNum = parseInt(newOrder);
    if (isNaN(orderNum)) return showNotification("Thứ tự không hợp lệ!", true);

    lesson.title = newTitle.trim();
    lesson.content = newContent.trim() || null;
    lesson.video_url = newVideoUrl.trim() || null;
    lesson.lesson_order = orderNum;
    showNotification("Cập nhật bài học thành công!");
    loadLessons(courseId, chapterId);
  }

  function deleteLesson(courseId, chapterId, lessonId) {
    if (!confirm("Bạn có chắc muốn xóa bài học này?")) return;

    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return showNotification("Chương không tồn tại!", true);

    chapter.lessons = chapter.lessons.filter(l => l.id !== lessonId);
    showNotification("Xóa bài học thành công!");
    loadLessons(courseId, chapterId);
  }

  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    notification.className = isError ? "error" : "";
    setTimeout(() => notification.style.display = "none", 3000);
  }

  document.getElementById("course-select")?.addEventListener("change", (e) => {
    const courseId = e.target.value;
    if (courseId) {
      loadChapters(courseId);
      populateChapterDropdown(courseId);
      document.querySelector("#lessons-table tbody").innerHTML = "";
    }
  });

  document.getElementById("chapter-select")?.addEventListener("change", (e) => {
    const courseId = document.getElementById("course-select").value;
    const chapterId = e.target.value;
    if (courseId && chapterId) {
      loadLessons(courseId, chapterId);
    }
  });

  // Initialize
  loadStatistics();
  initChart();
  loadCourses();
  loadUsers();
  loadTopupRequests();
  populateCourseDropdown();
});
// Thêm logic để mở dialog chọn thư mục khi nhấn vào folder-select
document.getElementById("folder-select")?.addEventListener("click", () => {
  document.getElementById("folder-input").click();
});

// Khi người dùng chọn thư mục, cập nhật danh sách trong folder-select
document.getElementById("folder-input")?.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    // Lấy danh sách các thư mục gốc từ các tệp đã chọn
    const folderSet = new Set();
    for (const file of files) {
      const folderPath = file.webkitRelativePath.split("/")[0]; // Lấy tên thư mục gốc
      folderSet.add(folderPath);
    }

    // Cập nhật danh sách thư mục vào folder-select
    const folderSelect = document.getElementById("folder-select");
    folderSelect.innerHTML = '<option value="">Chọn thư mục</option>'; // Xóa các option cũ
    folderSet.forEach((folder) => {
      const option = document.createElement("option");
      option.value = folder;
      option.textContent = folder;
      folderSelect.appendChild(option);
    });

    // Chọn thư mục đầu tiên (nếu có)
    if (folderSet.size > 0) {
      folderSelect.value = Array.from(folderSet)[0];
    }
  }
});