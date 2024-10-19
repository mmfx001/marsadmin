import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersEdit = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    league: '',
    coins: '',
    balance: '',
    attendance: '',
    xp: '',
    group: '',
    teacher: '',
    tolov: ''
  });
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    league: '',
    group: '',
    teacher: ''
  });
  const [availableGroupsAdd, setAvailableGroupsAdd] = useState([]);
  const [availableGroupsEdit, setAvailableGroupsEdit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, teachersResponse] = await Promise.all([
          axios.get('https://shoopjson-2.onrender.com/api/students'),
          axios.get('https://shoopjson-2.onrender.com/api/teachers') // Assumed endpoint for teachers
        ]);
        setStudents(studentsResponse.data);
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setEditedData({ ...student });
    setAvailableGroupsEdit(getGroupsByTeacher(student.teacher));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`https://shoopjson-2.onrender.com/api/students/${editingStudent}`, editedData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent ? { ...editedData, id: student.id } : student
        )
      );
      setEditingStudent(null);
      setAvailableGroupsEdit([]);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://shoopjson-2.onrender.com/api/students/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000).toString();
  };

  const handleAddStudent = async () => {
    // Basic validation
    if (!newStudentData.name || !newStudentData.league || !newStudentData.teacher || !newStudentData.group) {
      alert('Please fill in all the fields.');
      return;
    }

    const randomId = generateRandomId();
    const newStudent = {
      ...newStudentData,
      id: randomId,
      password: randomId,
      coins: 0,
      balance: 0,
      tolov: 0,
      attendance: 0,
      xp: 0,
      tasks: [
        {
          "id": "1",
          "Topic": "Введение Front-End",
          "description": "Создайте небольшой информационный сайт о себе с помощью тегов, которые вы сегодня узнали на уроке.",
          "requirement": "Использование тегов заголовков.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/289/4.4_-_homework.mp4"
        },
        {
          "id": "2",
          "Topic": "HTML теги и их атрибуты",
          "description": "Создайте мини-сайт о себе, используя теги, которые вы сегодня узнали на уроке.",
          "requirement": "Использование тегов, включая тег <mark>.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/103/Homework2.png"
        },
        {
          "id": "3",
          "Topic": "Iframe vs Img",
          "description": "Создайте небольшой информационный сайт о себе с помощью тегов, которые вы сегодня узнали на уроке.",
          "requirement": "Использование тегов <img> и <iframe>, а также тег <a>.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/104/homework3.png"
        },
        {
          "id": "4",
          "Topic": "Список тегов",
          "description": "Создайте небольшой сайт с информацией о Mars It School, используя теги Ordered и Unordered, и придайте ему стиль с помощью тегов, которые мы узнали сегодня.",
          "requirement": "Использование списков тегов, тегов <img>, встроенных стилей и тега <a>.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/105/homework4.png"
        },
        {
          "id": "5",
          "Topic": "Введение Css",
          "description": "Создайте небольшую веб-страницу на основе сегодняшней темы и используйте стили.",
          "requirement": "Правильное подключение CSS файла, использование тега <h1>, стилей border и работа с цветами.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/106/homework5.png"
        },
        {
          "id": "6",
          "Topic": "Теги формы",
          "description": "Создайте небольшую форму, используя теги формы, и настройте ее стиль.",
          "requirement": "Правильные типы инпутов, использование тега <button>, открытый CSS файл, использование классов для закрашивания цветов и тегов <input>.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/107/homework6.png"
        },
        {
          "id": "7",
          "Topic": "Box modeling",
          "description": "Создайте небольшой сайт о Margin, Padding, Border и Forms.",
          "requirement": "Использование тегов форм, центрирование текстов, использование margin и padding, применение цветов с помощью CSS.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/108/Homework7.png"
        },
        {
          "id": "8",
          "Topic": "Table",
          "description": "Создайте небольшую таблицу с помощью тега <table>.",
          "requirement": "Создание таблицы, задний фон задан с помощью CSS, таблица выровнена по центру.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/109/Homework8.png"
        },
        {
          "id": "9",
          "Topic": "FlexBox",
          "description": "Выполните задачу с помощью FlexBox.",
          "requirement": "Использование FlexBox, применение цветов с помощью CSS.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/110/Flex9.png"
        },
        {
          "id": "10",
          "Topic": "Container",
          "description": "Выполните задание до конца, используя контейнер.",
          "requirement": "Закончить проект полностью.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/111/Container.png"
        },
        {
          "id": "11",
          "Topic": "Практика FlexBox",
          "description": "Сделать проект до конца.",
          "requirement": "Правильно расположены карточки, сайт полностью завершен.",
          "materials": "https://lab.marsit.uz/media/project_images/examples/112/Flex_task_11_dars.png"
        }
      ],
    };

    try {
      await axios.post('https://shoopjson-2.onrender.com/api/students', newStudent);
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setNewStudentData({ name: '', league: '', group: '', teacher: '' });
      setAvailableGroupsAdd([]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const getGroupsByTeacher = (teacherName) => {
    const teacher = teachers.find((t) => t.teacher === teacherName);
    if (teacher) {
      // Extract group keys from teacher object excluding other properties
      return Object.keys(teacher).filter(key => !['id', 'teacher', 'password', 'students', 'groupcount', 'level'].includes(key));
    }
    return [];
  };

  const handleTeacherChangeAdd = (e) => {
    const selectedTeacher = e.target.value;
    const groups = getGroupsByTeacher(selectedTeacher);
    setNewStudentData({ ...newStudentData, teacher: selectedTeacher, group: groups[0] || '' });
    setAvailableGroupsAdd(groups);
  };

  const handleTeacherChangeEdit = (e) => {
    const selectedTeacher = e.target.value;
    const groups = getGroupsByTeacher(selectedTeacher);
    setEditedData({ ...editedData, teacher: selectedTeacher, group: groups[0] || '' });
    setAvailableGroupsEdit(groups);
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold text-orange-500 mb-5">Edit or Delete Students</h2>

      <div className="mb-5">
        <h3 className="text-2xl font-bold">Add New Student</h3>
        <input
          type="text"
          value={newStudentData.name}
          onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Name"
        />
        <input
          type="text"
          value={newStudentData.league}
          onChange={(e) => setNewStudentData({ ...newStudentData, league: e.target.value })}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="League"
        />
        <select
          value={newStudentData.teacher}
          onChange={handleTeacherChangeAdd}
          className="w-full p-2 mb-3 border rounded-md"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.teacher}>
              {teacher.teacher}
            </option>
          ))}
        </select>
        <select
          value={newStudentData.group}
          onChange={(e) => setNewStudentData({ ...newStudentData, group: e.target.value })}
          className="w-full p-2 mb-3 border rounded-md"
          disabled={!newStudentData.teacher}
        >
          <option value="">Select Group</option>
          {availableGroupsAdd.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Student
        </button>
      </div>

      {students && students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div key={student.id} className="border p-4 rounded-md shadow-md bg-white">
              {editingStudent === student.id ? (
                <>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    value={editedData.tolov}
                    onChange={(e) => setEditedData({ ...editedData, tolov: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Tolov"
                  />
                  <input
                    type="text"
                    value={editedData.league}
                    onChange={(e) => setEditedData({ ...editedData, league: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="League"
                  />
                  <input
                    type="number"
                    value={editedData.coins}
                    onChange={(e) => setEditedData({ ...editedData, coins: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Coins"
                  />
                  <input
                    type="number"
                    value={editedData.balance}
                    onChange={(e) => setEditedData({ ...editedData, balance: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Balance"
                  />
                  <input
                    type="number"
                    value={editedData.attendance}
                    onChange={(e) => setEditedData({ ...editedData, attendance: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Attendance"
                  />
                  <input
                    type="number"
                    value={editedData.xp}
                    onChange={(e) => setEditedData({ ...editedData, xp: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="XP"
                  />
                  <select
                    value={editedData.teacher}
                    onChange={handleTeacherChangeEdit}
                    className="w-full p-2 mb-3 border rounded-md"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.teacher}>
                        {teacher.teacher}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editedData.group}
                    onChange={(e) => setEditedData({ ...editedData, group: e.target.value })}
                    className="w-full p-2 mb-3 border rounded-md"
                    disabled={!editedData.teacher}
                  >
                    <option value="">Select Group</option>
                    {availableGroupsEdit.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  <div className="flex">
                    <button
                      onClick={handleSave}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingStudent(null);
                        setAvailableGroupsEdit([]);
                      }}
                      className="ml-2 text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">Name: {student.name}</p>
                  <p>League: {student.league}</p>
                  <p>Coins: {student.coins}</p>
                  <p>Balance: {student.balance}</p>
                  <p>Tolov: {student.tolov}</p>
                  <p>Attendance: {student.attendance}</p>
                  <p>XP: {student.xp}</p>
                  <p>Group: {student.group}</p>
                  <p>Teacher: {student.teacher}</p>
                  <div className="flex mt-4">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default UsersEdit;
