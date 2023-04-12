import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserEditDelete(props) {
  const [user, setUser] = useState(null); // the user to edit or delete
  const [name, setName] = useState(''); // the name input value
  const [email, setEmail] = useState(''); // the email input value

  useEffect(() => {
    // get the user data from the props or the API
    if (props.user) {
      setUser(props.user);
      setName(props.user.name);
      setEmail(props.user.email);
    } else if (props.userId) {
      axios.post(`https://my-api.com/users/${props.userId}`)
        .then(response => {
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [props.user, props.userId]);

  const handleNameChange = (event) => {
    // update the name input value
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    // update the email input value
    setEmail(event.target.value);
  };

  const handleEdit = () => {
    // make a post request to edit the user
    axios.post(`https://my-api.com/users/${user.id}`, { name, email })
      .then(response => {
        setUser(response.data);
        alert('User updated successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    // make a post request to delete the user
    axios.post(`https://my-api.com/users/delete/${user.id}`)
      .then(response => {
        setUser(null);
        alert('User deleted successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClose = () => {
    // redirect to the main screen
    props.history.push('/');
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>Edit or delete user</h3>
          <p>ID: {user.id}</p>
          <p>Name: <input type="text" value={name} onChange={handleNameChange} /></p>
          <p>Email: <input type="email" value={email} onChange={handleEmailChange} /></p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default UserEditDelete;