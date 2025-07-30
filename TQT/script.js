
let students = [];
let editIndex = -1;

const form = document.getElementById("studentForm");
const alertBox = document.getElementById("thongBao");
const tableBody = document.getElementById("studentTableBody");

function showAlert(msg) {
  alertBox.textContent = msg;
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 2500);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const maSV = document.getElementById("maSV").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaySinh = document.getElementById("ngaySinh").value;
  const gioiTinh = document.querySelector("input[name='gioiTinh']:checked")?.value || "";
  const ghiChu = document.getElementById("ghiChu").value.trim();

  if (!maSV || !hoTen || !email || !gioiTinh) {
    showAlert("Vui lòng điền đầy đủ thông tin bắt buộc!");
    return;
  }

  const regexEmail = /^\S+@\S+\.\S+$/;
  if (!regexEmail.test(email)) {
    showAlert("Email không hợp lệ");
    return;
  }

  const newData = { maSV, hoTen, email, gioiTinh, ngaySinh, ghiChu };

  if (editIndex === -1) {
    students.push(newData);
    showAlert("Đã thêm sinh viên");
  } else {
    students[editIndex] = newData;
    showAlert("Đã cập nhật sinh viên");
    editIndex = -1;
    document.getElementById("btnThem").innerText = "Thêm sinh viên";
  }

  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((sv, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${sv.maSV}</td>
      <td>${sv.hoTen}</td>
      <td>${sv.email}</td>
      <td>${sv.gioiTinh}</td>
      <td>${sv.ngaySinh || ""}</td>
      <td>
        <a onclick="editStudent(${index})">Sửa</a> | 
        <a onclick="deleteStudent(${index})">Xoá</a>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function deleteStudent(index) {
  if (confirm("Bạn có chắc muốn xoá sinh viên này?")) {
    students.splice(index, 1);
    renderTable();
    showAlert("Đã xoá sinh viên");
  }
}

function editStudent(index) {
  const sv = students[index];
  document.getElementById("maSV").value = sv.maSV;
  document.getElementById("hoTen").value = sv.hoTen;
  document.getElementById("email").value = sv.email;
  document.getElementById("ngaySinh").value = sv.ngaySinh;
  document.querySelector(`input[name='gioiTinh'][value='${sv.gioiTinh}']`).checked = true;
  document.getElementById("ghiChu").value = sv.ghiChu;
  editIndex = index;
  showAlert("Đang sửa thông tin sinh viên...");
  document.getElementById("btnThem").innerText = "Cập nhật";
}
