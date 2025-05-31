// js/course-detail.js

// Dữ liệu mẫu giả lập (backend sẽ trả JSON giống như thế này)
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

function renderCourseSections(data) {
  const container = document.getElementById("section-list");
  container.innerHTML = "";

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
    container.appendChild(sectionDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Cập nhật chi tiết khóa học demo
  document.getElementById("course-title").textContent = "Khóa học JavaScript từ cơ bản đến nâng cao";
  document.getElementById("course-image").src = "https://via.placeholder.com/800x400?text=JavaScript+Course";
  document.getElementById("course-description").textContent = "Học JavaScript từ A-Z, giúp bạn xây dựng web tương tác và hiện đại.";
  document.getElementById("course-instructor").textContent = "Trần Thị B";
  document.getElementById("course-price").textContent = "499000";

  // Hiển thị chương và bài học
  renderCourseSections(courseData);
});
