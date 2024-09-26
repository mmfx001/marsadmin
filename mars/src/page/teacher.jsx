import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeachersEdit = () => {
  const [teachers, setTeachers] = useState([]);
  const [filials, setFilials] = useState([]);
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
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
        const teacherResponse = await axios.get('http://localhost:5001/teachers');
        setTeachers(teacherResponse.data);
        const filialResponse = await axios.get('http://localhost:5001/filials');
        setFilials(filialResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacherData({ ...newTeacherData, [name]: value });
  };

  const handleNewFilialChange = (e) => {
    const { name, value } = e.target;
    setNewFilialData({ ...newFilialData, [name]: value });
  };

  const handleAddTeacher = async () => {
    try {
      const response = await axios.post('http://localhost:5001/teachers', newTeacherData);
      setTeachers([...teachers, response.data]);
      setNewTeacherData({ ...newTeacherData, name: '', password: '', students: '', groupcount: '', level: '', groups: [{ groupNumber: '', time: '', studentscount: '', coins: '' }] });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
    try {
      const response = await axios.post('http://localhost:5001/rating', newTeacherData);
      setTeachers([...teachers, response.data]);
      setNewTeacherData({ ...newTeacherData, name: '', Retention: '', Umumiy: '', Ketganlar: '', QA: '', Usage:'' });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleAddFilial = async () => {
    try {
      const response = await axios.post('http://localhost:5001/filials', newFilialData);
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
      const response = await axios.put(`http://localhost:5001/teachers/${editingTeacher.id}`, editedTeacherData);
      setTeachers(teachers.map(teacher => (teacher.id === editingTeacher.id ? response.data : teacher)));
      setEditingTeacher(null);
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/teachers/${id}`);
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
          <input type="text" name="name" value={newTeacherData.name} onChange={handleNewTeacherChange} className="p-2 border border-gray-300 rounded" placeholder="Name" />
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
              <button onClick={() => removeGroup(index)} className="bg-red-500 text-white rounded p-2">Remove</button>
            </div>
          ))}
          <button onClick={addNewGroup} className="bg-blue-500 text-white rounded p-2">Add Group</button>
        </div>

        <button onClick={handleAddTeacher} className="bg-green-500 text-white rounded p-2 mt-4">Add Teacher</button>
      </div>

      {/* New Filial Form */}
      <div className="mb-8 p-4 border border-gray-300 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Add New Filial</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" value={newFilialData.name} onChange={handleNewFilialChange} className="p-2 border border-gray-300 rounded" placeholder="Filial Name" />
          <input type="text" name="location" value={newFilialData.location} onChange={handleNewFilialChange} className="p-2 border border-gray-300 rounded" placeholder="Location" />
        </div>
        <button onClick={handleAddFilial} className="bg-green-500 text-white rounded p-2 mt-4">Add Filial</button>
      </div>

      {/* Teachers List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Teachers List</h2>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="border p-4 mb-4 rounded bg-gray-50">
            {editingTeacher && editingTeacher.id === teacher.id ? (
              <>
                <h3 className="text-lg font-semibold">Editing Teacher</h3>
                <input type="text" name="name" value={editedTeacherData.name} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded mb-2" placeholder="Name" />
                <input type="password" name="password" value={editedTeacherData.password} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded mb-2" placeholder="Password" />
                <input type="text" name="students" value={editedTeacherData.students} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded mb-2" placeholder="Students" />
                <input type="text" name="groupcount" value={editedTeacherData.groupcount} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded mb-2" placeholder="Group Count" />
                <input type="text" name="level" value={editedTeacherData.level} onChange={handleEditedTeacherChange} className="p-2 border border-gray-300 rounded mb-2" placeholder="Level" />
                
                <button onClick={handleSaveEditedTeacher} className="bg-green-500 text-white rounded p-2">Save</button>
                <button onClick={() => setEditingTeacher(null)} className="bg-gray-500 text-white rounded p-2 ml-2">Cancel</button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{teacher.name}</h3>
                <p>Students: {teacher.students}</p>
                <p>Group Count: {teacher.groupcount}</p>
                <p>Level: {teacher.level}</p>
                <button onClick={() => handleEditTeacher(teacher)} className="bg-blue-500 text-white rounded p-2">Edit</button>
                <button onClick={() => handleDeleteTeacher(teacher.id)} className="bg-red-500 text-white rounded p-2 ml-2">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersEdit;
