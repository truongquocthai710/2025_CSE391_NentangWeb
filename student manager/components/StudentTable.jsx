import React from 'react'

function StudentTable({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return <p>Chưa có sinh viên nào.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã SV</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((sv, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{sv.maSV}</td>
            <td>{sv.hoTen}</td>
            <td>{sv.email}</td>
            <td>{sv.gioiTinh}</td>
            <td>{sv.ngaySinh || ''}</td>
            <td>
              <a onClick={() => onEdit(index)}>Sửa</a> {' | '}
              <a onClick={() => onDelete(index)}>Xoá</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentTable
