import React, { useEffect, useState } from 'react';

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    fetch('https://localhost:7195/api/Auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      {/* Add more fields as needed based on your API's response */}
    </div>
  );
}

export default UserDetails;
