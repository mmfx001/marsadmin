import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeachersEdit = () => {
  // State variables
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editedTeacherData, setEditedTeacherData] = useState({
    name: '',
    password: '',
    students: '',
    groupcount: '',
    level: '',
    groups: []
  });
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    password: '',
    students: '',
    groupcount: '',
    level: '',
    groups: []
  });

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // Function to generate random ID
  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000).toString();
  };

  // Handle adding a new teacher
  const handleAddTeacher = async () => {
    // Basic validation
    if (
      !newTeacherData.name ||
      !newTeacherData.password ||
      !newTeacherData.students ||
      !newTeacherData.groupcount ||
      !newTeacherData.level
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    // Ensure at least one group is added
    if (newTeacherData.groups.length === 0) {
      alert('Please add at least one group.');
      return;
    }

    // Check for empty groupNumber
    for (let group of newTeacherData.groups) {
      if (group.groupNumber.trim() === '') {
        alert('Group Number cannot be empty.');
        return;
      }
    }

    // Transform groups array to object with group numbers as keys
    const groupsObject = {};
    newTeacherData.groups.forEach(group => {
      const { groupNumber } = group;
      groupsObject[groupNumber] = [{
        time: group.time,
        studentscount: group.studentscount,
        coins: group.coins,
        group: group.groupNumber
      }];
    });

    const newTeacher = {
      id: generateRandomId(),
      teacher: newTeacherData.name,
      password: newTeacherData.password,
      students: newTeacherData.students,
      groupcount: newTeacherData.groupcount,
      level: newTeacherData.level,
      ...groupsObject
    };

    try {
      await axios.post('http://localhost:5001/teachers', newTeacher);
      setTeachers(prev => [...prev, newTeacher]);
      setNewTeacherData({
        name: '',
        password: '',
        students: '',
        groupcount: '',
        level: '',
        groups: []
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  // Handle editing a teacher
  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher.id);
    // Transform group keys to array
    const groupsArray = Object.keys(teacher)
      .filter(key => !['id', 'teacher', 'password', 'students', 'groupcount', 'level'].includes(key))
      .map(groupNumber => ({
        groupNumber,
        time: teacher[groupNumber][0].time,
        studentscount: teacher[groupNumber][0].studentscount,
        coins: teacher[groupNumber][0].coins
      }));
    setEditedTeacherData({
      name: teacher.teacher,
      password: teacher.password,
      students: teacher.students,
      groupcount: teacher.groupcount,
      level: teacher.level,
      groups: groupsArray
    });
  };

  // Handle saving edited teacher
  const handleSaveEditedTeacher = async () => {
    // Basic validation
    if (
      !editedTeacherData.name ||
      !editedTeacherData.password ||
      !editedTeacherData.students ||
      !editedTeacherData.groupcount ||
      !editedTeacherData.level
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    // Ensure at least one group is present
    if (editedTeacherData.groups.length === 0) {
      alert('Please add at least one group.');
      return;
    }

    // Check for empty groupNumber
    for (let group of editedTeacherData.groups) {
      if (group.groupNumber.trim() === '') {
        alert('Group Number cannot be empty.');
        return;
      }
    }

    // Transform groups array to object with group numbers as keys
    const groupsObject = {};
    editedTeacherData.groups.forEach(group => {
      const { groupNumber } = group;
      groupsObject[groupNumber] = [{
        time: group.time,
        studentscount: group.studentscount,
        coins: group.coins,
        group: group.groupNumber
      }];
    });

    const updatedTeacher = {
      teacher: editedTeacherData.name,
      password: editedTeacherData.password,
      students: editedTeacherData.students,
      groupcount: editedTeacherData.groupcount,
      level: editedTeacherData.level,
      ...groupsObject
    };

    try {
      await axios.patch(`http://localhost:5001/teachers/${editingTeacher}`, updatedTeacher);
      setTeachers(prev =>
        prev.map(t => t.id === editingTeacher ? { ...updatedTeacher, id: t.id } : t)
      );
      setEditingTeacher(null);
      setEditedTeacherData({
        name: '',
        password: '',
        students: '',
        groupcount: '',
        level: '',
        groups: []
      });
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  // Handle deleting a teacher
  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/teachers/${id}`);
      setTeachers(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  // Handle changes in new teacher form inputs
  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacherData(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes in edited teacher form inputs
  const handleEditedTeacherChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacherData(prev => ({ ...prev, [name]: value }));
  };

  // Add a new group to the new teacher form
  const addNewGroup = () => {
    setNewTeacherData(prev => ({
      ...prev,
      groups: [...prev.groups, { groupNumber: '', time: '', studentscount: '', coins: '' }]
    }));
  };

  // Remove a group from the new teacher form
  const removeGroup = (index) => {
    setNewTeacherData(prev => ({
      ...prev,
      groups: prev.groups.filter((_, i) => i !== index)
    }));
  };

  // Add a new group to the edited teacher form
  const addEditedGroup = () => {
    setEditedTeacherData(prev => ({
      ...prev,
      groups: [...prev.groups, { groupNumber: '', time: '', studentscount: '', coins: '' }]
    }));
  };

  // Remove a group from the edited teacher form
  const removeEditedGroup = (index) => {
    setEditedTeacherData(prev => ({
      ...prev,
      groups: prev.groups.filter((_, i) => i !== index)
    }));
  };

  // Handle changes in group fields for new teacher form
  const handleNewGroupChange = (index, e) => {
    const { name, value } = e.target;
    setNewTeacherData(prev => ({
      ...prev,
      groups: prev.groups.map((group, i) =>
        i === index ? { ...group, [name]: value } : group
      )
    }));
  };

  // Handle changes in group fields for edited teacher form
  const handleEditedGroupChange = (index, e) => {
    const { name, value } = e.target;
    setEditedTeacherData(prev => ({
      ...prev,
      groups: prev.groups.map((group, i) =>
        i === index ? { ...group, [name]: value } : group
      )
    }));
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold text-blue-500 mb-5">Manage Teachers</h2>

      {/* Add New Teacher Form */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold">Add New Teacher</h3>
        <input
          type="text"
          name="name"
          value={newTeacherData.name}
          onChange={handleNewTeacherChange}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Name"
        />
        <input
          type="password"
          name="password"
          value={newTeacherData.password}
          onChange={handleNewTeacherChange}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Password"
        />
        <input
          type="number"
          name="students"
          value={newTeacherData.students}
          onChange={handleNewTeacherChange}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Number of Students"
        />
        <input
          type="number"
          name="groupcount"
          value={newTeacherData.groupcount}
          onChange={handleNewTeacherChange}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Group Count"
        />
        <input
          type="text"
          name="level"
          value={newTeacherData.level}
          onChange={handleNewTeacherChange}
          className="w-full p-2 mb-3 border rounded-md"
          placeholder="Level"
        />

        {/* Groups Section */}
        <div className="mb-3">
          <h4 className="text-xl font-semibold">Groups</h4>
          {newTeacherData.groups.map((group, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="groupNumber"
                value={group.groupNumber}
                onChange={(e) => handleNewGroupChange(index, e)}
                className="w-24 p-2 mr-2 border rounded-md"
                placeholder="Group Number"
              />
              <input
                type="text"
                name="time"
                value={group.time}
                onChange={(e) => handleNewGroupChange(index, e)}
                className="w-32 p-2 mr-2 border rounded-md"
                placeholder="Time"
              />
              <input
                type="number"
                name="studentscount"
                value={group.studentscount}
                onChange={(e) => handleNewGroupChange(index, e)}
                className="w-32 p-2 mr-2 border rounded-md"
                placeholder="Students Count"
              />
              <input
                type="number"
                name="coins"
                value={group.coins}
                onChange={(e) => handleNewGroupChange(index, e)}
                className="w-24 p-2 mr-2 border rounded-md"
                placeholder="Coins"
              />
              <button
                type="button" // Important: Specify type="button"
                onClick={() => removeGroup(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button" // Important: Specify type="button"
            onClick={addNewGroup}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Group
          </button>
        </div>

        <button
          type="button" // Important: Specify type="button"
          onClick={handleAddTeacher}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Teacher
        </button>
      </div>

      {/* Teachers List */}
      {teachers && teachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="border p-4 rounded-md shadow-md bg-white">
              {editingTeacher === teacher.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedTeacherData.name}
                    onChange={handleEditedTeacherChange}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Name"
                  />
                  <input
                    type="password"
                    name="password"
                    value={editedTeacherData.password}
                    onChange={handleEditedTeacherChange}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Password"
                  />
                  <input
                    type="number"
                    name="students"
                    value={editedTeacherData.students}
                    onChange={handleEditedTeacherChange}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Number of Students"
                  />
                  <input
                    type="number"
                    name="groupcount"
                    value={editedTeacherData.groupcount}
                    onChange={handleEditedTeacherChange}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Group Count"
                  />
                  <input
                    type="text"
                    name="level"
                    value={editedTeacherData.level}
                    onChange={handleEditedTeacherChange}
                    className="w-full p-2 mb-3 border rounded-md"
                    placeholder="Level"
                  />

                  {/* Groups Section */}
                  <div className="mb-3">
                    <h4 className="text-xl font-semibold">Groups</h4>
                    {editedTeacherData.groups.map((group, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          name="groupNumber"
                          value={group.groupNumber}
                          onChange={(e) => handleEditedGroupChange(index, e)}
                          className="w-24 p-2 mr-2 border rounded-md"
                          placeholder="Group Number"
                        />
                        <input
                          type="text"
                          name="time"
                          value={group.time}
                          onChange={(e) => handleEditedGroupChange(index, e)}
                          className="w-32 p-2 mr-2 border rounded-md"
                          placeholder="Time"
                        />
                        <input
                          type="number"
                          name="studentscount"
                          value={group.studentscount}
                          onChange={(e) => handleEditedGroupChange(index, e)}
                          className="w-32 p-2 mr-2 border rounded-md"
                          placeholder="Students Count"
                        />
                        <input
                          type="number"
                          name="coins"
                          value={group.coins}
                          onChange={(e) => handleEditedGroupChange(index, e)}
                          className="w-24 p-2 mr-2 border rounded-md"
                          placeholder="Coins"
                        />
                        <button
                          type="button" // Important: Specify type="button"
                          onClick={() => removeEditedGroup(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button" // Important: Specify type="button"
                      onClick={addEditedGroup}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Add Group
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      type="button" // Important: Specify type="button"
                      onClick={handleSaveEditedTeacher}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Save
                    </button>
                    <button
                      type="button" // Important: Specify type="button"
                      onClick={() => {
                        setEditingTeacher(null);
                        setEditedTeacherData({
                          name: '',
                          password: '',
                          students: '',
                          groupcount: '',
                          level: '',
                          groups: []
                        });
                      }}
                      className="ml-2 text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">Name: {teacher.teacher}</p>
                  <p>Password: {teacher.password}</p>
                  <p>Students: {teacher.students}</p>
                  <p>Group Count: {teacher.groupcount}</p>
                  <p>Level: {teacher.level}</p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Groups:</h4>
                    {Object.keys(teacher)
                      .filter(key => !['id', 'teacher', 'password', 'students', 'groupcount', 'level'].includes(key))
                      .map((groupNumber) => (
                        <div key={groupNumber} className="ml-4">
                          <p>Group Number: {groupNumber}</p>
                          {teacher[groupNumber].map((group, idx) => (
                            <div key={idx} className="ml-4">
                              <p>Time: {group.time}</p>
                              <p>Students Count: {group.studentscount}</p>
                              <p>Coins: {group.coins}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                  <div className="flex mt-4">
                    <button
                      type="button" // Important: Specify type="button"
                      onClick={() => handleEditTeacher(teacher)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button" // Important: Specify type="button"
                      onClick={() => handleDeleteTeacher(teacher.id)}
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
        <p>No teachers found.</p>
      )}
    </div>
  );
};

export default TeachersEdit;
