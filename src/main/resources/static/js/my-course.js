const myCourses = [
  {
    id: 1,
    title: "Lập trình JavaScript cơ bản",
    description: "Khóa học giúp bạn nắm vững các kiến thức căn bản về JavaScript.",
    image: "https://via.placeholder.com/280x150?text=JS+Basic"
  },
  {
    id: 2,
    title: "Python cho người mới bắt đầu",
    description: "Khóa học Python từ cơ bản đến nâng cao dành cho người mới.",
    image: "https://via.placeholder.com/280x150?text=Python+Beginner"
  }
];

function renderMyCourses(courses) {
  const container = document.getElementById("my-courses-list");
  const noCoursesMsg = document.getElementById("no-courses");

  if (!courses || courses.length === 0) {
    container.style.display = "none";
    noCoursesMsg.style.display = "block";
    return;
  }

  noCoursesMsg.style.display = "none";
  container.style.display = "flex";

  container.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";

    card.innerHTML = `
      <img src="${course.image}" alt="Ảnh khóa học" />
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <button onclick="goToCourse(${course.id})">Xem khóa học</button>
    `;

    container.appendChild(card);
  });
}

function goToCourse(courseId) {
  window.location.href = `course.html?courseId=${courseId}`;
}

document.addEventListener("DOMContentLoaded", function () {
  renderMyCourses(myCourses);

  // Cập nhật trạng thái đăng nhập
  const user = JSON.parse(localStorage.getItem("user"));
  const authButtons = document.getElementById("auth-buttons");

  if (user) {
    authButtons.innerHTML = `
      <a href="profile.html">Xin chào, ${user.name || "Người dùng"}</a>
      <a href="#" id="logout-btn">Đăng xuất</a>
    `;

    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      location.reload();
    });
  }
});
