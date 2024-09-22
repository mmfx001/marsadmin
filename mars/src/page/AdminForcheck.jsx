import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminForcheck = () => {
  const [tasks, setTasks] = useState([]);
  const [comment, setComment] = useState('');

  // Fetch tasks from JSON server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/files');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  const handleApprove = async (taskId, userId) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    try {
      // Update task status to approved
      await axios.patch(`http://localhost:5001/files/${taskId}`, {
        status: 'approved',
      });
  
      // Fetch the current user data to update coins
      const userResponse = await axios.get(`http://localhost:5001/students/${userId}`);
      const currentCoins = parseInt(userResponse.data.coin, 10) || 0;
  
      // Add 10 coins to user
      const newCoins = currentCoins + 10;
      await axios.patch(`http://localhost:5001/students/${userId}`, {
        coin: newCoins,
      });
  
      // Remove task from UI after approval
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
    } catch (error) {
      console.error('Error approving task:', error);
    }
  };
  

  const handleReject = async (taskId) => {
    if (!comment) {
      alert('Please provide a rejection comment.');
      return;
    }

    try {
      // Update task status to rejected with comment
      await axios.patch(`http://localhost:5001/files/${taskId}`, {
        status: 'rejected',
        comment: comment,
      });

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      ); // Remove task from UI after rejection
    } catch (error) {
      console.error('Error rejecting task:', error);
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>Task Review (Admin)</h1>
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
                  <img src={task.fileData} alt="Uploaded file" className="w-full h-auto mt-2 rounded-lg" />
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

            <div className='mt-4'>
              <button
                onClick={() => handleApprove(task.id, task.userId)}
                className='bg-green-500 text-white px-4 py-2 rounded mr-2'
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


            {task.status === 'rejected' && (
              <div className='mt-2'>
                <textarea
                  placeholder='Reason for rejection'
                  className='w-full p-2 border rounded'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminForcheck;
