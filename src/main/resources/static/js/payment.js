document.addEventListener("DOMContentLoaded", function () {
  const courseInfoDiv = document.getElementById("course-info");
  const qrCodeDiv = document.getElementById("qr-code");
  const btnBack = document.getElementById("btn-back");

  // Lấy dữ liệu khóa học từ localStorage
  const selectedCourse = JSON.parse(localStorage.getItem("selectedCourse"));

  if (!selectedCourse) {
    courseInfoDiv.textContent = "Không có thông tin khóa học để thanh toán.";
    return;
  }

  courseInfoDiv.textContent = `Bạn đang thanh toán khóa học: "${selectedCourse.name}" với giá ${Number(selectedCourse.price).toLocaleString('vi-VN')} VND`;

  // Ví dụ nội dung QR code là một URL giả lập thanh toán với ID khóa học
  const paymentUrl = `https://payment.example.com/pay?courseId=${selectedCourse.id}&amount=${selectedCourse.price}`;

  // Tạo QR Code
  QRCode.toCanvas(qrCodeDiv, paymentUrl, { width: 200 }, function (error) {
    if (error) {
      console.error(error);
      courseInfoDiv.textContent = "Lỗi khi tạo QR Code.";
    }
  });

  btnBack.addEventListener("click", function () {
    // Xóa dữ liệu khi quay lại
    localStorage.removeItem("selectedCourse");
    window.location.href = "courses.html";
  });
});
