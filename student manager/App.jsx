import React, { useEffect, useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'

function App() {
  const [students, setStudents] = useState([])
  const [editIndex, setEditIndex] = useState(-1)
  const [alertMsg, setAlertMsg] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('students')
    if (stored) setStudents(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])
  const showAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => setAlertMsg(''), 2500)
  }

  const handleAdd = (student) => {
    setStudents(prev => [...prev, student])
    showAlert('Đã thêm sinh viên')
  }

  const handleUpdate = (index, student) => {
    setStudents(prev => prev.map((s, i) => (i === index ? student : s)))
    setEditIndex(-1)
    showAlert('Đã cập nhật sinh viên')
  }

  const handleDelete = (index) => {
    if (!confirm('Bạn có chắc muốn xoá sinh viên này?')) return
    setStudents(prev => prev.filter((_, i) => i !== index))
    if (editIndex === index) setEditIndex(-1)
    showAlert('Đã xoá sinh viên')
  }

  const handleEditClick = (index) => {
    setEditIndex(index)
    showAlert('Đang sửa thông tin sinh viên...')
  }

  const cancelEdit = () => {
    setEditIndex(-1)
  }

  return (
    <div>
      <div className="navbar">Quản Lý Sinh Viên</div>

      <div className="container">
        <div className="form-container">
          <h2>{editIndex === -1 ? 'Thêm Sinh Viên' : 'Sửa Sinh Viên'}</h2>
          <StudentForm
            onAdd={handleAdd}
            onUpdate={(student) => handleUpdate(editIndex, student)}
            editingStudent={editIndex !== -1 ? students[editIndex] : null}
            cancelEdit={cancelEdit}
          />
          <div className="alert" style={{ display: alertMsg ? 'block' : 'none' }}>{alertMsg}</div>
        </div>

        <div className="table-container">
          <h2>Danh Sách Sinh Viên</h2>
          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default App
