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
  const userMenu = document.getElementById("user-menu");
  const menuName = document.getElementById("menu-name");
  const menuAvatar = document.getElementById("menu-avatar");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userAvatar = document.getElementById("user-avatar");

  if (user) {
    userMenu.style.display = "flex";
    menuName.textContent = user.name;
    menuAvatar.src = user.avatar || "user-avatar.png";
    userName.textContent = user.name;
    userEmail.textContent = user.email;
    userAvatar.src = user.avatar || "user-avatar.png";
  } else {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("user");
  showNotification("Bạn đã đăng xuất.");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

function myCourses() {
  window.location.href = "my-courses.html";
}

function topUp() {
  window.location.href = "topup.html";
}

window.onload = () => {
  checkLogin();

  const userMenu = document.getElementById("user-menu");
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const editProfileModal = document.getElementById("edit-profile-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const editProfileForm = document.getElementById("edit-profile-form");
  const changePasswordBtn = document.getElementById("change-password-btn");
  const changePasswordModal = document.getElementById("change-password-modal");
  const closePasswordModalBtn = document.getElementById("close-password-modal");
  const changePasswordForm = document.getElementById("change-password-form");
  const userAvatar = document.getElementById("user-avatar");
  const editAvatarModal = document.getElementById("edit-avatar-modal");
  const closeAvatarModalBtn = document.getElementById("close-avatar-modal");
  const avatarInput = document.getElementById("avatar-input");
  const avatarPreview = document.getElementById("avatar-preview");
  const editAvatarForm = document.getElementById("edit-avatar-form");

  // Toggle menu
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
  };

  // Open/close edit profile modal
  editProfileBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
    editProfileModal.style.display = 'block';
  });
  closeModalBtn.addEventListener('click', () => editProfileModal.style.display = 'none');

  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('edit-name').value.trim();
    const newEmail = document.getElementById('edit-email').value.trim();
    if (newName && newEmail) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.name = newName;
      user.email = newEmail;
      localStorage.setItem("user", JSON.stringify(user));
      document.getElementById('user-name').textContent = newName;
      document.getElementById('user-email').textContent = newEmail;
      document.getElementById('menu-name').textContent = newName;
      showNotification('Cập nhật thông tin thành công!');
      editProfileModal.style.display = 'none';
    } else {
      showNotification('Vui lòng nhập đầy đủ thông tin!', true);
    }
  });

  // Open/close change password modal
  changePasswordBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'block';
    changePasswordForm.reset();
  });
  closePasswordModalBtn.addEventListener('click', () => changePasswordModal.style.display = 'none');

  changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPwd = document.getElementById('current-password').value;
    const newPwd = document.getElementById('new-password').value;
    const confirmPwd = document.getElementById('confirm-password').value;

    if (currentPwd !== '123456') {
      showNotification('Mật khẩu hiện tại không đúng!', true);
      return;
    }
    if (newPwd.length < 6) {
      showNotification('Mật khẩu mới phải có ít nhất 6 ký tự!', true);
      return;
    }
    if (newPwd !== confirmPwd) {
      showNotification('Mật khẩu mới và xác nhận mật khẩu không khớp!', true);
      return;
    }
    showNotification('Đổi mật khẩu thành công!');
    changePasswordModal.style.display = 'none';
  });

  // Open modal chọn avatar khi click avatar
  userAvatar.addEventListener('click', () => {
    avatarPreview.src = userAvatar.src;
    avatarInput.value = '';
    editAvatarModal.style.display = 'block';
  });
  closeAvatarModalBtn.addEventListener('click', () => editAvatarModal.style.display = 'none');

  // Xem trước ảnh khi chọn file
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      avatarPreview.src = userAvatar.src;
    }
  });

  // Lưu ảnh đại diện mới
  editAvatarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!avatarInput.files[0]) {
      showNotification('Vui lòng chọn ảnh đại diện mới!', true);
      return;
    }
    const file = avatarInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.avatar = e.target.result;
      localStorage.setItem("user", JSON.stringify(user));
      userAvatar.src = e.target.result;
      document.getElementById('menu-avatar').src = e.target.result;
      showNotification('Cập nhật ảnh đại diện thành công!');
      editAvatarModal.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // Đóng modal khi click ngoài nội dung modal
  window.onclick = function(event) {
    if (event.target === editProfileModal) {
      editProfileModal.style.display = 'none';
    }
    if (event.target === changePasswordModal) {
      changePasswordModal.style.display = 'none';
    }
    if (event.target === editAvatarModal) {
      editAvatarModal.style.display = 'none';
    }
    if (!userMenu.contains(event.target)) {
      userMenu.classList.remove("active");
    }
  };
};