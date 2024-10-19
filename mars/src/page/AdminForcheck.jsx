import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminForcheck = () => {
  const [tasks, setTasks] = useState([]);
  const [approvedTasks, setApprovedTasks] = useState([]);
  const [comments, setComments] = useState({});

  // Fetch tasks from JSON server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://shoopjson-2.onrender.com/api/files');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Handle Approve
  const handleApprove = async (taskId, userId) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    try {
      // Update task status to approved
      await axios.patch(`https://shoopjson-2.onrender.com/api/files/${taskId}`, {
        status: 'approved',
      });

      // Fetch the current user data to update coins
      const userResponse = await axios.get(`https://shoopjson-2.onrender.com/api/students/${userId}`);
      const currentCoins = parseInt(userResponse.data.balance, 10) || 0;
      const newc = parseInt(userResponse.data.coins, 10) || 0;

      // Add 10 coins to user
      const newCoins = currentCoins + 10;
      const newCoin = newc + 10;
      console.log(newCoins),

      await axios.patch(`https://shoopjson-2.onrender.com/api/students/${userId}`, {
        
        balance: newCoins,
        coins:newCoin
      });

      // Move task to approvedTasks
      const approvedTask = tasks.find(task => task.id === taskId);
      if (approvedTask) {
        setApprovedTasks(prev => [...prev, approvedTask]);
        
        // Delete the task from the server
        await axios.delete(`https://shoopjson-2.onrender.com/api/files/${taskId}`);
        
        // Remove task from UI after deletion
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      }

    } catch (error) {
      console.error('Error approving task:', error);
    }
  };

  // Handle Reject
  const handleReject = async (taskId) => {
    const rejectionComment = comments[taskId] || '';
    if (!rejectionComment.trim()) {
      alert('Iltimos, rad etish sababi bilan kommentariya kiriting.');
      return;
    }

    try {
      // Update task status to rejected with comment
      await axios.patch(`https://shoopjson-2.onrender.com/api/files/${taskId}`, {
        status: 'rejected',
        comment: rejectionComment,
      });

      // Remove task from UI after rejection
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
    } catch (error) {
      console.error('Error rejecting task:', error);
    }
  };

  // Handle Comment Change
  const handleCommentChange = (taskId, value) => {
    setComments(prev => ({ ...prev, [taskId]: value }));
  };

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>Task Review (Admin)</h1>

      {/* Pending Tasks */}
      <div>
        <h2 className='text-xl font-semibold mb-2'>Pending Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks to review.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className='bg-white p-4 rounded-lg shadow-md mb-4'>
              <h2 className='text-xl font-semibold'>{task.comment}</h2>
              <p><strong>Posted by:</strong> {task.username}</p>
              <p><strong>Date:</strong> {task.timestamp}</p>
              <p><strong>Status:</strong> {task.status}</p>

              {task.fileData && (
                <div className='mt-4'>
                  <p><strong>Attached File:</strong></p>
                  {task.fileData.startsWith('data:image') ? (
                    <img src={task.fileData} alt="Uploaded file" className="w-96 h-auto mt-2 rounded-lg" />
                  ) : (
                    <a
                      href={task.fileData}
                      download={`file_${task.id}`}
                      className="text-blue-500 underline"
                    >
                      Download File
                    </a>
                  )}
                </div>
              )}

              <div className='mt-4 flex flex-col md:flex-row items-start md:items-center'>
                <button
                  onClick={() => handleApprove(task.id, task.userId)}
                  className='bg-green-500 text-white px-4 py-2 rounded mr-2 mb-2 md:mb-0'
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(task.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Reject
                </button>
              </div>

              {/* Reject Comment */}
              <div className='mt-2'>
                <textarea
                  placeholder='Reason for rejection'
                  className='w-full p-2 border rounded'
                  value={comments[task.id] || ''}
                  onChange={(e) => handleCommentChange(task.id, e.target.value)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approved Tasks */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-2'>Approved Tasks</h2>
        {approvedTasks.length === 0 ? (
          <p>No approved tasks yet.</p>
        ) : (
          approvedTasks.map((task) => (
            <div key={task.id} className='bg-green-100 p-4 rounded-lg shadow-md mb-4'>
              <h2 className='text-xl font-semibold'>{task.comment}</h2>
              <p><strong>Approved by:</strong> Admin</p>
              <p><strong>Date Approved:</strong> {new Date().toLocaleString()}</p>
              {task.fileData && (
                <div className='mt-4'>
                  <p><strong>Attached File:</strong></p>
                  {task.fileData.startsWith('data:image') ? (
                    <img src={task.fileData} alt="Uploaded file" className="w-96 h-auto mt-2 rounded-lg" />
                  ) : (
                    <a
                      href={task.fileData}
                      download={`file_${task.id}`}
                      className="text-blue-500 underline"
                    >
                      Download File
                    </a>
                  )}
                </div>
              )}
              <p className='mt-2 text-green-700'><strong>Task approved and 10 coins added to user.</strong></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminForcheck;
