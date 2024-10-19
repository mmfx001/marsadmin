import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeachersEdit = () => {
  const [teachers, setTeachers] = useState([]);
  const [filials, setFilials] = useState([]);
  const [newTeacherData, setNewTeacherData] = useState({
    id: '', // Added id field here
    teacher: '',
    password: '',
    students: '',
    groupcount: '',
    level: '',
    groups: [{ groupNumber: '', time: '', studentscount: '', coins: '' }]
  });
  const [newFilialData, setNewFilialData] = useState({ name: '', location: '' });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editedTeacherData, setEditedTeacherData] = useState({});

  useEffect(() => {
    // Fetch teachers and filials from the API
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get('https://shoopjson-2.onrender.com/api/teachers');
        setTeachers(teacherResponse.data);
        const filialResponse = await axios.get('https://shoopjson-2.onrender.com/api/filials');
        setFilials(filialResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target; // Fixed this line to destructure name correctly
    setNewTeacherData({ ...newTeacherData, [name]: value });
  };

  const handleNewFilialChange = (e) => {
    const { name, value } = e.target; // Fixed this line to destructure name correctly
    setNewFilialData({ ...newFilialData, [name]: value });
  };

  const handleAddTeacher = async () => {
    try {
      // Ensure to set a unique id before posting
      const newId = Date.now(); // or generate your unique id logic here
      const teacherDataToPost = { ...newTeacherData, id: newId }; // Include the id in the data being posted

      const response = await axios.post('https://shoopjson-2.onrender.com/api/teachers', teacherDataToPost);
      setTeachers([...teachers, response.data]);
      setNewTeacherData({
        id: '', // Reset the id field
        teacher: '',
        password: '',
        students: '',
        groupcount: '',
        level: '',
        groups: [{ groupNumber: '', time: '', studentscount: '', coins: '' }]
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }

    try {
      const ratingDataToPost = { ...newTeacherData, id: newId }; // Ensure to set the same id for ratings
      const response = await axios.post('https://shoopjson-2.onrender.com/api/rating', ratingDataToPost);
      setTeachers([...teachers, response.data]);
      setNewTeacherData({
        id: '', // Reset the id field
        teacher: '',
        password: '',
        students: '',
        groupcount: '',
        level: '',
        groups: [{ groupNumber: '', time: '', studentscount: '', coins: '' }]
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleAddFilial = async () => {
    try {
      const response = await axios.post('https://shoopjson-2.onrender.com/api/filials', newFilialData);
      setFilials([...filials, response.data]);
      setNewFilialData({ name: '', location: '' });
    } catch (error) {
      console.error('Error adding filial:', error);
    }
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setEditedTeacherData(teacher);
  };

  const handleEditedTeacherChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacherData({ ...editedTeacherData, [name]: value });
  };

  const handleSaveEditedTeacher = async () => {
    try {
      const response = await axios.put(`https://shoopjson-2.onrender.com/api/teachers/${editingTeacher.id}`, editedTeacherData);
      setTeachers(teachers.map(teacher => (teacher.id === editingTeacher.id ? response.data : teacher)));
      setEditingTeacher(null);
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`https://shoopjson-2.onrender.com/api/teachers/${id}`);
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const addNewGroup = () => {
    setNewTeacherData({
      ...newTeacherData,
      groups: [...newTeacherData.groups, { groupNumber: '', time: '', studentscount: '', coins: '' }]
    });
  };

  const removeGroup = (index) => {
    setNewTeacherData({
      ...newTeacherData,
      groups: newTeacherData.groups.filter((_, i) => i !== index)
    });
  };

  const addEditedGroup = () => {
    setEditedTeacherData({
      ...editedTeacherData,
      groups: [...editedTeacherData.groups, { groupNumber: '', time: '', studentscount: '', coins: '' }]
    });
  };

  const removeEditedGroup = (index) => {
    setEditedTeacherData({
      ...editedTeacherData,
      groups: editedTeacherData.groups.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Edit Teachers</h1>

      {/* New Teacher Form */}
      <div className="mb-8 p-4 border border-gray-300 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="teacher" value={newTeacherData.teacher} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Name" />
          <input type="password" name="password" value={newTeacherData.password} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Password" />
          <input type="text" name="students" value={newTeacherData.students} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Students" />
          <input type="text" name="groupcount" value={newTeacherData.groupcount} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Group Count" />
          <input type="text" name="level" value={newTeacherData.level} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Level" />
        </div>

        {/* Group management for new teacher */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Groups</h3>
          {newTeacherData.groups.map((group, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
              <input type="text" placeholder="Group Number" value={group.groupNumber} onChange={(e) => {
                const updatedGroups = [...newTeacherData.groups];
                updatedGroups[index].groupNumber = e.target.value;
                setNewTeacherData({ ...newTeacherData, groups: updatedGroups });
              }} className="p-2 border border-gray-300 rounded" />
              <input type="text" placeholder="Time" value={group.time} onChange={(e) => {
                const updatedGroups = [...newTeacherData.groups];
                updatedGroups[index].time = e.target.value;
                setNewTeacherData({ ...newTeacherData, groups: updatedGroups });
              }} className="p-2 border border-gray-300 rounded" />
              <input type="text" placeholder="Students Count" value={group.studentscount} onChange={(e) => {
                const updatedGroups = [...newTeacherData.groups];
                updatedGroups[index].studentscount = e.target.value;
                setNewTeacherData({ ...newTeacherData, groups: updatedGroups });
              }} className="p-2 border border-gray-300 rounded" />
              <input type="text" placeholder="Coins" value={group.coins} onChange={(e) => {
                const updatedGroups = [...newTeacherData.groups];
                updatedGroups[index].coins = e.target.value;
                setNewTeacherData({ ...newTeacherData, groups: updatedGroups });
              }} className="p-2 border border-gray-300 rounded" />
              <button type="button" onClick={() => removeGroup(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addNewGroup} className="p-2 bg-green-500 text-white rounded">Add Group</button>
        </div>
        
        <button onClick={handleAddTeacher} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Teacher</button>
      </div>

      {/* Teacher List */}
      <h2 className="text-xl font-semibold mb-4">Teachers List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Password</th>
            <th className="p-2 border border-gray-300">Students</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="p-2 border border-gray-300">{teacher.teacher}</td>
              <td className="p-2 border border-gray-300">{teacher.password}</td>
              <td className="p-2 border border-gray-300">{teacher.students}</td>
              <td className="p-2 border border-gray-300">
                <button onClick={() => handleEditTeacher(teacher)} className="bg-yellow-500 text-white rounded p-1">Edit</button>
                <button onClick={() => handleDeleteTeacher(teacher.id)} className="bg-red-500 text-white rounded p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edited Teacher Form */}
      {editingTeacher && (
        <div className="mb-8 p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="teacher" value={editedTeacherData.teacher} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Name" />
            <input type="password" name="password" value={editedTeacherData.password} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Password" />
            <input type="text" name="students" value={editedTeacherData.students} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Students" />
            <input type="text" name="groupcount" value={editedTeacherData.groupcount} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Group Count" />
            <input type="text" name="level" value={editedTeacherData.level} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Level" />
          </div>

          {/* Group management for edited teacher */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Groups</h3>
            {editedTeacherData.groups.map((group, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                <input type="text" placeholder="Group Number" value={group.groupNumber} onChange={(e) => {
                  const updatedGroups = [...editedTeacherData.groups];
                  updatedGroups[index].groupNumber = e.target.value;
                  setEditedTeacherData({ ...editedTeacherData, groups: updatedGroups });
                }} className="p-2 border border-gray-300 rounded" />
                <input type="text" placeholder="Time" value={group.time} onChange={(e) => {
                  const updatedGroups = [...editedTeacherData.groups];
                  updatedGroups[index].time = e.target.value;
                  setEditedTeacherData({ ...editedTeacherData, groups: updatedGroups });
                }} className="p-2 border border-gray-300 rounded" />
                <input type="text" placeholder="Students Count" value={group.studentscount} onChange={(e) => {
                  const updatedGroups = [...editedTeacherData.groups];
                  updatedGroups[index].studentscount = e.target.value;
                  setEditedTeacherData({ ...editedTeacherData, groups: updatedGroups });
                }} className="p-2 border border-gray-300 rounded" />
                <input type="text" placeholder="Coins" value={group.coins} onChange={(e) => {
                  const updatedGroups = [...editedTeacherData.groups];
                  updatedGroups[index].coins = e.target.value;
                  setEditedTeacherData({ ...editedTeacherData, groups: updatedGroups });
                }} className="p-2 border border-gray-300 rounded" />
                <button type="button" onClick={() => removeEditedGroup(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addEditedGroup} className="p-2 bg-green-500 text-white rounded">Add Group</button>
          </div>

          <button onClick={handleSaveEditedTeacher} className="mt-4 p-2 bg-blue-500 text-white rounded">Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default TeachersEdit;
