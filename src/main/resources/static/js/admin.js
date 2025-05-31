document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".sidebar-nav ul li[data-section]");
  const logoutBtn = document.getElementById("logout-btn");
  const createCourseForm = document.getElementById("create-course-form");

  let courses = [
    { id: 1, title: "Digital Marketing A-Z", price: 1200000 },
    { id: 2, title: "Lập trình Python căn bản", price: 800000 },
  ];

  let users = [
    { id: 1, username: "user1", email: "user1@example.com", role: "Học viên" },
    { id: 2, username: "admin", email: "admin@example.com", role: "Quản trị viên" },
  ];

  let topupRequests = [
    { id: 1, user: "user1", amount: 100000, status: "Chờ duyệt" },
    { id: 2, user: "user2", amount: 500000, status: "Chấp nhận" },
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
    // TODO: Gọi API logout nếu cần
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
      return alert("Vui lòng điền đầy đủ thông tin!");
    }

    const newCourse = {
      id: Date.now(),
      title: title.value.trim(),
      price: parseInt(price.value.trim()),
    };

    courses.push(newCourse);
    alert(`Tạo khóa học thành công!\nTiêu đề: ${newCourse.title}\nGiá: ${newCourse.price} VNĐ`);
    createCourseForm.reset();

    switchTab("manage-courses");
    loadCourses();
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

    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => editCourse(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteCourse(parseInt(btn.dataset.id)));
    });
  }

  function editCourse(id) {
    const course = courses.find((c) => c.id === id);
    if (!course) return alert("Không tìm thấy khóa học!");

    const newTitle = prompt("Nhập tiêu đề mới:", course.title);
    if (newTitle === null) return;

    const newPriceStr = prompt("Nhập giá tiền mới (VNĐ):", course.price);
    if (newPriceStr === null) return;

    const newPrice = parseInt(newPriceStr);
    if (isNaN(newPrice)) return alert("Giá tiền không hợp lệ!");

    course.title = newTitle.trim();
    course.price = newPrice;

    alert("Cập nhật thành công!");
    loadCourses();
  }

  function deleteCourse(id) {
    if (confirm("Bạn có chắc muốn xóa khóa học?")) {
      courses = courses.filter((c) => c.id !== id);
      loadCourses();
    }
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
  }

  function loadTopupRequests() {
    const tbody = document.querySelector("#topup-table tbody");
    tbody.innerHTML = "";

    topupRequests.forEach((req) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${req.id}</td>
        <td>${req.user}</td>
        <td>${req.amount.toLocaleString()} VNĐ</td>
        <td>${req.status}</td>
        <td>
          ${req.status === "Chờ duyệt" ? `
            <button class="btn-approve" data-id="${req.id}">Duyệt</button>
            <button class="btn-reject" data-id="${req.id}">Từ chối</button>` : ""}
        </td>`;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-approve").forEach((btn) =>
      btn.addEventListener("click", () => updateTopupStatus(parseInt(btn.dataset.id), "Chấp nhận"))
    );

    document.querySelectorAll(".btn-reject").forEach((btn) =>
      btn.addEventListener("click", () => updateTopupStatus(parseInt(btn.dataset.id), "Từ chối"))
    );
  }

  function updateTopupStatus(id, status) {
    const req = topupRequests.find((r) => r.id === id);
    if (!req) return alert("Yêu cầu không tồn tại!");
    req.status = status;
    alert(`Yêu cầu ${id} đã được ${status.toLowerCase()}!`);
    loadTopupRequests();
  }

  // Khởi tạo
  loadStatistics();
  initChart();
  loadCourses();
  loadUsers();
  loadTopupRequests();
});
document.addEventListener("DOMContentLoaded", () => {
  // Existing code for courses, users, topupRequests...

  // Initialize courses with chapters and lessons
  let courses = [
    {
      id: 1,
      title: "Digital Marketing A-Z",
      price: 1200000,
      thumbnail_url: "https://example.com/thumbnail.jpg",
      chapters: [
        {
          id: 1,
          title: "Introduction",
          section_order: 1,
          lessons: [
            { id: 1, title: "Lesson 1: Basics", content: "Introduction text", lesson_order: 1, video_url: "https://example.com/video1.mp4" },
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

  // Populate course dropdown
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

  // Populate chapter dropdown based on selected course
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

  // Load chapters for a selected course
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

      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => editChapter(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId)));
      });
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deleteChapter(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId)));
      });
    }
  }

  // Load lessons for a selected course and chapter
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

      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => editLesson(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId), parseInt(btn.dataset.lessonId)));
      });
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deleteLesson(parseInt(btn.dataset.courseId), parseInt(btn.dataset.chapterId), parseInt(btn.dataset.lessonId)));
      });
    }
  }

  // Handle chapter creation
  document.getElementById("create-chapter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const courseId = parseInt(document.getElementById("course-select").value);
    const title = document.getElementById("chapter-title").value.trim();
    const order = parseInt(document.getElementById("chapter-order").value);

    if (!courseId || !title || isNaN(order)) return alert("Vui lòng điền đầy đủ thông tin!");

    const course = courses.find(c => c.id === courseId);
    if (!course) return alert("Khóa học không tồn tại!");

    const newChapter = {
      id: Date.now(),
      title,
      section_order: order,
      lessons: []
    };

    course.chapters.push(newChapter);
    alert(`Tạo chương thành công: ${title}`);
    document.getElementById("create-chapter-form").reset();
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  });

  // Handle lesson creation
  document.getElementById("create-lesson-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const courseId = parseInt(document.getElementById("course-select").value);
    const chapterId = parseInt(document.getElementById("chapter-select").value);
    const title = document.getElementById("lesson-title").value.trim();
    const content = document.getElementById("lesson-content").value.trim();
    const videoUrl = document.getElementById("lesson-video").value.trim() || null;
    const order = parseInt(document.getElementById("lesson-order").value);

    if (!courseId || !chapterId || !title || isNaN(order)) return alert("Vui lòng điền đầy đủ thông tin!");

    const course = courses.find(c => c.id === courseId);
    if (!course) return alert("Khóa học không tồn tại!");

    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return alert("Chương không tồn tại!");

    const newLesson = {
      id: Date.now(),
      title,
      content: content || null,
      video_url: videoUrl,
      lesson_order: order
    };

    chapter.lessons.push(newLesson);
    alert(`Tạo bài học thành công: ${title}`);
    document.getElementById("create-lesson-form").reset();
    loadLessons(courseId, chapterId);
  });

  // Edit chapter
  function editChapter(courseId, chapterId) {
    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return alert("Chương không tồn tại!");

    const newTitle = prompt("Nhập tiêu đề mới:", chapter.title);
    if (newTitle === null) return;

    const newOrder = prompt("Nhập thứ tự mới:", chapter.section_order);
    if (newOrder === null) return;

    const orderNum = parseInt(newOrder);
    if (isNaN(orderNum)) return alert("Thứ tự không hợp lệ!");

    chapter.title = newTitle.trim();
    chapter.section_order = orderNum;
    alert("Cập nhật chương thành công!");
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  }

  // Delete chapter
  function deleteChapter(courseId, chapterId) {
    if (!confirm("Bạn có chắc muốn xóa chương này? Tất cả bài học trong chương cũng sẽ bị xóa!")) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return alert("Khóa học không tồn tại!");

    course.chapters = course.chapters.filter(ch => ch.id !== chapterId);
    alert("Xóa chương thành công!");
    loadChapters(courseId);
    populateChapterDropdown(courseId);
  }

  // Edit lesson
  function editLesson(courseId, chapterId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    const lesson = chapter?.lessons.find(l => l.id === lessonId);
    if (!lesson) return alert("Bài học không tồn tại!");

    const newTitle = prompt("Nhập tiêu đề mới:", lesson.title);
    if (newTitle === null) return;

    const newContent = prompt("Nhập nội dung mới:", lesson.content || "");
    const newVideoUrl = prompt("Nhập URL video mới (để trống nếu không có):", lesson.video_url || "");
    const newOrder = prompt("Nhập thứ tự mới:", lesson.lesson_order);
    if (newOrder === null) return;

    const orderNum = parseInt(newOrder);
    if (isNaN(orderNum)) return alert("Thứ tự không hợp lệ!");

    lesson.title = newTitle.trim();
    lesson.content = newContent.trim() || null;
    lesson.video_url = newVideoUrl.trim() || null;
    lesson.lesson_order = orderNum;
    alert("Cập nhật bài học thành công!");
    loadLessons(courseId, chapterId);
  }

  // Delete lesson
  function deleteLesson(courseId, chapterId, lessonId) {
    if (!confirm("Bạn có chắc muốn xóa bài học này?")) return;

    const course = courses.find(c => c.id === courseId);
    const chapter = course?.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return alert("Chương không tồn tại!");

    chapter.lessons = chapter.lessons.filter(l => l.id !== lessonId);
    alert("Xóa bài học thành công!");
    loadLessons(courseId, chapterId);
  }

  // Event listener for course selection
  document.getElementById("course-select")?.addEventListener("change", (e) => {
    const courseId = e.target.value;
    if (courseId) {
      loadChapters(courseId);
      populateChapterDropdown(courseId);
      document.querySelector("#lessons-table tbody").innerHTML = ""; // Clear lessons table
    }
  });

  // Event listener for chapter selection
  document.getElementById("chapter-select")?.addEventListener("change", (e) => {
    const courseId = document.getElementById("course-select").value;
    const chapterId = e.target.value;
    if (courseId && chapterId) {
      loadLessons(courseId, chapterId);
    }
  });

  // Initialize
  populateCourseDropdown();
  // Existing initialization code for loadStatistics, initChart, loadCourses, loadUsers, loadTopupRequests...
});