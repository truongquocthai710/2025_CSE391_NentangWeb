import React, { useEffect, useState } from 'react'

function StudentForm({ onAdd, onUpdate, editingStudent, cancelEdit }) {
  const [maSV, setMaSV] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [email, setEmail] = useState('')
  const [ngaySinh, setNgaySinh] = useState('')
  const [gioiTinh, setGioiTinh] = useState('')
  const [ghiChu, setGhiChu] = useState('')

  useEffect(() => {
    if (editingStudent) {
      setMaSV(editingStudent.maSV || '')
      setHoTen(editingStudent.hoTen || '')
      setEmail(editingStudent.email || '')
      setNgaySinh(editingStudent.ngaySinh || '')
      setGioiTinh(editingStudent.gioiTinh || '')
      setGhiChu(editingStudent.ghiChu || '')
    } else {
      setMaSV('')
      setHoTen('')
      setEmail('')
      setNgaySinh('')
      setGioiTinh('')
      setGhiChu('')
    }
  }, [editingStudent])

  const showTempAlert = (msg) => {
  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!maSV.trim() || !hoTen.trim() || !email.trim() || !gioiTinh) {
      showTempAlert('Vui lòng điền đầy đủ thông tin bắt buộc!')
      return
    }
    const regexEmail = /^\S+@\S+\.\S+$/
    if (!regexEmail.test(email)) {
      showTempAlert('Email không hợp lệ')
      return
    }

    const newData = {
      maSV: maSV.trim(),
      hoTen: hoTen.trim(),
      email: email.trim(),
      gioiTinh,
      ngaySinh,
      ghiChu: ghiChu.trim(),
    }

    if (editingStudent) {
      onUpdate(newData)
    } else {
      onAdd(newData)
    }
    if (!editingStudent) {
      setMaSV('')
      setHoTen('')
      setEmail('')
      setNgaySinh('')
      setGioiTinh('')
      setGhiChu('')
    }
  }

  return (
    <form onSubmit={handleSubmit} id="studentForm">
      <label htmlFor="maSV">Mã sinh viên *</label>
      <input id="maSV" value={maSV} onChange={e => setMaSV(e.target.value)} required />

      <label htmlFor="hoTen">Họ và tên *</label>
      <input id="hoTen" value={hoTen} onChange={e => setHoTen(e.target.value)} required />

      <label htmlFor="email">Email *</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label htmlFor="ngaySinh">Ngày sinh</label>
      <input id="ngaySinh" type="date" value={ngaySinh} onChange={e => setNgaySinh(e.target.value)} />

      <label>Giới tính</label>
      <div className="gender-group">
        <label><input name="gioiTinh" type="radio" value="Nam" checked={gioiTinh === 'Nam'} onChange={() => setGioiTinh('Nam')} /> Nam</label>
        <label><input name="gioiTinh" type="radio" value="Nữ" checked={gioiTinh === 'Nữ'} onChange={() => setGioiTinh('Nữ')} /> Nữ</label>
      </div>

      <label htmlFor="ghiChu">Ghi chú</label>
      <textarea id="ghiChu" rows="2" value={ghiChu} onChange={e => setGhiChu(e.target.value)} />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" id="btnThem">{editingStudent ? 'Cập nhật' : 'Thêm sinh viên'}</button>
        {editingStudent && (
          <button type="button" onClick={cancelEdit} style={{ background: '#6c757d' }}>Hủy</button>
        )}
      </div>
    </form>
  )
}

export default StudentForm
