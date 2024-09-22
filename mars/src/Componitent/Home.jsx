import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const userdata = JSON.parse(localStorage.getItem('loggedInUser')); // Parse the JSON string

  return (
    <div>
      <h1>Home</h1>
    <p>Guruhlar:</p>
      {userdata ? (
        <div>
          <Link to={'/learning'}>
            <button>{userdata.guruh}</button>
          </Link>
        </div>
      ) : (
        <p>No user data found</p>
      )}

    </div>
  );
}

export default Home;
